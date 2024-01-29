import { Inject, Injectable, Logger } from '@nestjs/common'
import { genSalt, hash } from 'bcrypt'
import { randomBytes } from 'crypto'

import { PaginatedResponse } from '../../shared/interfaces/shared.interfaces'
import {
    AuthUserRoleEnum,
    AuthUserStatusEnum,
    Prisma,
    PrismaService,
} from '../../shared/prisma'
import { parseMetaArgs } from '../../shared/utils'
import { AUTH_CONFIG, AuthConfig } from '../auth.config'
import { CreateUser, GetUsers, User } from '../interfaces/auth.interfaces'
import { AuthEventPattern, AuthEventsService } from './auth-events.service'

@Injectable()
export class AuthAdminService {
    private logger = new Logger()

    constructor(
        @Inject(AUTH_CONFIG)
        private readonly config: AuthConfig,
        private readonly prisma: PrismaService,
        private readonly events: AuthEventsService,
    ) {}

    async onApplicationBootstrap() {
        await this.createOwnerIfNotExists()
    }

    async createOwnerIfNotExists() {
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
                    role: AuthUserRoleEnum.OWNER,
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

    async getUsers(data: GetUsers): Promise<PaginatedResponse<User>> {
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
            queryOptions.where.role = filter.role
        }

        if (filter?.status) {
            queryOptions.where.status = filter.status
        }

        if (orderBy) {
            queryOptions.orderBy = {
                [orderBy.field]: orderBy.order,
            }
        }

        console.log(queryOptions)

        const users = await this.prisma.authUser.findMany({
            ...queryOptions,
            skip,
            take,
        })

        const total = await this.prisma.authUser.count({
            ...queryOptions,
        })

        console.log({
            meta: {
                curPage,
                perPage,
                total,
            },
            data: users,
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

    async createUser(data: CreateUser): Promise<User> {
        const { email, firstname, lastname, role } = data

        const code = randomBytes(32).toString('hex')

        const salt = await genSalt()
        const hashedCode = await hash(code, salt)

        const user = await this.prisma.authUser.create({
            data: {
                email,
                firstname,
                lastname,
                role,
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

    async deleteUser(userId: string): Promise<User> {
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
}
