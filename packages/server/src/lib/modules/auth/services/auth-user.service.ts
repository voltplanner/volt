import { Inject, Injectable, Logger } from '@nestjs/common'
import { compare, genSalt, hash } from 'bcrypt'

import { PrismaService, RoleEnum } from '../../shared/prisma'
import { AUTH_CONFIG, AuthConfig } from '../auth.config'
import {
    CreateUser,
    FindFilter,
    SignInPayload,
    SignInResponse,
    UpdateUser,
    User,
} from '../interfaces/auth.interfaces'
import { AuthTokensService } from './auth-tokens.service'

@Injectable()
export class AuthUserService {
    private logger = new Logger()

    constructor(
        @Inject(AUTH_CONFIG)
        private readonly config: AuthConfig,
        private readonly tokens: AuthTokensService,
        private readonly prisma: PrismaService,
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
            await this.createUser({
                email: this.config.adminEmail,
                password: this.config.adminPassword,
                role: RoleEnum.OWNER,
                firstname: 'Volt',
                lastname: 'Owner',
            })

            this.logger.log(`Owner created: ${this.config.adminEmail}`, {
                label: 'auth',
            })
        }
    }

    async createUser(data: CreateUser): Promise<User> {
        const salt = await genSalt()
        const hashedPassword = await hash(data.password, salt)

        const user = await this.prisma.authUser.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        })

        return user
    }

    async updateUser(userId: string, data: UpdateUser): Promise<boolean> {
        await this.prisma.authUser.update({
            where: {
                id: userId,
            },
            data: {
                ...data,
            },
        })

        // TODO: add error handling

        return true
    }

    async findOne(userId: string): Promise<User> {
        const user = await this.prisma.authUser.findUnique({
            where: { id: userId },
            select: {
                email: true,
                lastname: true,
                firstname: true,
                createdAt: true,
                deletedAt: true,
                role: true,
                id: true,
            },
        })

        if (!user) {
            // TODO: add error handling
            throw new Error('User not found')
        }

        return user
    }

    async findMany(data: FindFilter): Promise<User[]> {
        const { skip, take, filter } = data

        const users = await this.prisma.authUser.findMany({
            where: {
                ...filter,
            },
            skip,
            take,
        })

        return users
    }

    async signIn(data: SignInPayload): Promise<SignInResponse> {
        const { email } = data

        const user = await this.prisma.authUser.findUnique({
            where: { email },
            select: {
                id: true,
                password: true,
                role: true,
            },
        })

        if (!user) {
            // TODO: error handling
            throw new Error('Invalid login or password')
        }

        const isValid = await compare(data.password, user.password)

        if (!isValid) {
            throw new Error('Invalid login or password')
        }

        const refreshToken = await this.tokens.generateRefreshToken(
            user.id,
            user.role,
        )

        const accessToken = await this.tokens.generateAccessToken(
            user.id,
            user.role,
        )

        return {
            adminId: user.id,
            accessToken,
            refreshToken,
            expiresAt:
                Math.floor(Date.now() / 1000) + this.tokens.accessTokenTTL,
        }
    }
}
