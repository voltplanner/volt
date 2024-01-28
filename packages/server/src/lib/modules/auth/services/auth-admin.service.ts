import { Inject, Injectable, Logger } from '@nestjs/common'
import { genSalt, hash } from 'bcrypt'
import { randomBytes } from 'crypto'

import {
    AuthUserRoleEnum,
    AuthUserStatusEnum,
    PrismaService,
} from '../../shared/prisma'
import { AUTH_CONFIG, AuthConfig } from '../auth.config'
import {
    CreateUser,
    CreateUserWithPassword,
    User,
} from '../interfaces/auth.interfaces'
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
            await this.createUserWithPassword({
                email: this.config.adminEmail,
                password: this.config.adminPassword,
                role: AuthUserRoleEnum.OWNER,
                firstname: 'Volt',
                lastname: 'Owner',
            })

            this.logger.log(`Owner created: ${this.config.adminEmail}`, {
                label: 'auth',
            })
        }
    }

    async createUserWithPassword(data: CreateUserWithPassword): Promise<User> {
        const salt = await genSalt()
        const hashedPassword = await hash(data.password, salt)

        const user = await this.prisma.authUser.create({
            data: {
                ...data,
                password: hashedPassword,
                status: AuthUserStatusEnum.ACTIVE,
            },
        })

        return user
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
