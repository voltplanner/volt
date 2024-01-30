import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { compare, genSalt, hash } from 'bcrypt'

import { AuthUserStatusEnum, PrismaService } from '../../shared/prisma'
import {
    CompleteSignIn,
    SignInPayload,
    SignInResponse,
} from '../interfaces/auth.interfaces'
import { AuthTokensService } from './auth-tokens.service'

@Injectable()
export class AuthUserService {
    constructor(
        private readonly tokens: AuthTokensService,
        private readonly prisma: PrismaService,
    ) {}

    async signIn(data: SignInPayload): Promise<SignInResponse> {
        const { email } = data

        const user = await this.prisma.authUser.findUnique({
            where: { email, status: AuthUserStatusEnum.ACTIVE },
            select: {
                id: true,
                password: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        if (!user) {
            throw new BadRequestException('Invalid login or password')
        }

        const isValid = await compare(data.password, user.password)

        if (!isValid) {
            throw new BadRequestException('Invalid login or password')
        }

        const refreshToken = await this.tokens.generateRefreshToken(
            user.id,
            user.role.name,
        )

        const accessToken = await this.tokens.generateAccessToken(
            user.id,
            user.role.name,
        )

        return {
            userId: user.id,
            accessToken,
            refreshToken,
            expiresAt:
                Math.floor(Date.now() / 1000) + this.tokens.accessTokenTTL,
        }
    }

    async completeSignIn(data: CompleteSignIn) {
        const { userId, code, password } = data

        const user = await this.prisma.authUser.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                completeCode: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isValid = await compare(code, user.completeCode)

        if (!isValid) {
            throw new BadRequestException('Invalid code')
        }

        const salt = await genSalt()
        const hashedPassword = await hash(password, salt)

        await this.prisma.authUser.update({
            where: {
                id: userId,
            },
            data: {
                password: hashedPassword,
                status: AuthUserStatusEnum.ACTIVE,
            },
        })

        const refreshToken = await this.tokens.generateRefreshToken(
            user.id,
            user.role.name,
        )

        const accessToken = await this.tokens.generateAccessToken(
            user.id,
            user.role.name,
        )

        return {
            userId: user.id,
            accessToken,
            refreshToken,
            expiresAt:
                Math.floor(Date.now() / 1000) + this.tokens.accessTokenTTL,
        }
    }
}
