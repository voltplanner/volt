import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { genSalt, hash } from 'bcrypt'
import { randomBytes } from 'crypto'

import { AuthUserStatusEnum, Prisma, PrismaService } from '../../shared/prisma'
import { parseMetaArgs } from '../../shared/utils'
import { AUTH_CONFIG, AuthConfig } from '../auth.config'
import { CreateUser, GetUsers, UpdateUser } from '../interfaces/auth.interfaces'
import { AuthEventPattern, AuthEventsService } from './auth-events.service'

@Injectable()
export class AuthUserService {
    private logger = new Logger()

    constructor(
        @Inject(AUTH_CONFIG)
        private readonly config: AuthConfig,
        private readonly prisma: PrismaService,
        private readonly events: AuthEventsService,
    ) {}

    async getMyUser(userId: string) {
        const user = await this.prisma.authUser.findUnique({
            where: {
                id: userId,
            },
        })

        if (!user) {
            throw new NotFoundException('No user found')
        }

        return user
    }

    async getUsers(data: GetUsers) {
        const { filter, orderBy } = data

        const { skip, take, curPage, perPage } = parseMetaArgs({
            curPage: data.curPage,
            perPage: data.perPage,
            defaults: {
                curPage: 1,
                perPage: 20,
            },
        })

        const queryOptions: {
            where?: Prisma.AuthUserWhereInput
            orderBy?: Prisma.AuthUserOrderByWithRelationInput
        } = {
            where: {
                email: undefined,
                OR: undefined,
                role: undefined,
                status: undefined,
            },
            orderBy: undefined,
        }

        if (filter?.email) {
            queryOptions.where['email'] = { contains: filter.email }
        }

        if (filter?.firstname) {
            queryOptions.where.OR = [
                {
                    firstname: { contains: filter.firstname },
                },
                { lastname: { contains: filter.firstname } },
            ]
        }

        if (filter?.lastname) {
            queryOptions.where.OR = [
                {
                    firstname: { contains: filter.lastname },
                },
                { lastname: { contains: filter.lastname } },
            ]
        }

        if (filter?.role) {
            queryOptions.where.role = {
                name: filter.role,
            }
        }

        if (filter?.status) {
            queryOptions.where.status = filter.status
        }

        if (orderBy) {
            queryOptions.orderBy = {
                [orderBy.field]: orderBy.order,
            }
        }

        const users = await this.prisma.authUser.findMany({
            ...queryOptions,
            skip,
            take,
        })

        const total = await this.prisma.authUser.count({
            ...queryOptions,
        })

        return {
            meta: {
                curPage,
                perPage,
                total,
            },
            data: users,
        }
    }

    async updateUser(data: UpdateUser) {
        const { userId, password, status, role, ...updateFields } = data

        const isUserExist = await this.prisma.authUser.findUnique({
            where: {
                id: userId,
            },
            select: {
                status: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        if (!isUserExist) {
            throw new NotFoundException('User not found')
        }

        const updateData: Prisma.AuthUserUpdateInput = {
            ...updateFields,
            password: undefined,
            status: undefined,
            role: undefined,
        }

        if (password) {
            const salt = await genSalt()
            const hashedPassword = await hash(password, salt)

            updateData.password = hashedPassword
        }

        if (role) {
            if (isUserExist.role.name === 'owner') {
                throw new BadRequestException(`Can't change owner role`)
            }

            if (isUserExist.role.name === 'owner') {
                throw new BadRequestException(
                    `Can't change user role to this type`,
                )
            }

            updateData.role = {
                update: {
                    name: role,
                },
            }
        }

        if (status) {
            if (status === AuthUserStatusEnum.WAITING_COMPLETE) {
                throw new BadRequestException(
                    `Can't change user status to this type`,
                )
            }

            if (isUserExist.status === AuthUserStatusEnum.WAITING_COMPLETE) {
                throw new BadRequestException(
                    `Can't change user status. Need to complete sign in`,
                )
            }

            updateData.status = status
        }

        const user = await this.prisma.authUser.update({
            where: {
                id: userId,
            },
            data: updateData,
        })

        return user
    }

    async createUser(data: CreateUser) {
        const { email, firstname, lastname, roleName } = data

        const code = randomBytes(32).toString('hex')

        const salt = await genSalt()
        const hashedCode = await hash(code, salt)

        const user = await this.prisma.authUser.create({
            data: {
                email,
                firstname,
                lastname,
                role: {
                    connect: {
                        name: roleName,
                    },
                },
                completeCode: hashedCode,
                status: AuthUserStatusEnum.WAITING_COMPLETE,
            },
        })

        this.events.send({
            pattern: AuthEventPattern.COMPLETE_SIGNIN,
            data: {
                userId: user.id,
                code: code,
            },
        })

        return user
    }

    async deleteUser(userId: string) {
        const user = await this.prisma.authUser.update({
            where: {
                id: userId,
                deletedAt: {
                    not: null,
                },
            },
            data: {
                status: AuthUserStatusEnum.BLOCKED,
                deletedAt: new Date(),
            },
        })

        return user
    }

    async _createOwnerIfNotExists() {
        const isOwnerExist = await this.prisma.authUser.findUnique({
            where: {
                email: this.config.adminEmail,
            },
        })

        if (!isOwnerExist) {
            const salt = await genSalt()
            const hashedPassword = await hash(this.config.adminPassword, salt)

            await this.prisma.authUser.create({
                data: {
                    email: this.config.adminEmail,
                    role: {
                        connect: {
                            name: 'owner',
                        },
                    },
                    firstname: 'Volt',
                    lastname: 'Owner',
                    password: hashedPassword,
                    status: AuthUserStatusEnum.ACTIVE,
                },
            })

            this.logger.log(`Owner created: ${this.config.adminEmail}`, {
                label: 'auth',
            })
        }
    }
}
