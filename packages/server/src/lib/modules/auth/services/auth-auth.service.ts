import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common'
import { compare, genSalt, hash } from 'bcrypt'

import { AuthUserStatusEnum, PrismaService } from '../../../shared/prisma'
import { AuthorizationResponse } from '../interfaces/auth.graphql'
import {
    CompleteSignIn,
    SignInPayload,
    SignInResponse,
} from '../interfaces/auth.interfaces'
import { AuthTokensService } from './auth-tokens.service'

@Injectable()
export class AuthAuthService {
    constructor(
        private readonly tokens: AuthTokensService,
        private readonly prisma: PrismaService,
    ) {}

    async signIn(data: SignInPayload): Promise<SignInResponse> {
        const { email } = data

        const user = await this.prisma.authUser.findUnique({
            where: { email, status: AuthUserStatusEnum.ACTIVE },
            include: {
                role: true,
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

    async refreshToken(refreshToken: string): Promise<AuthorizationResponse> {
        const refreshTokenPayload = await this.tokens.decodeRefreshToken(
            refreshToken,
        )

        const token = await this.prisma.authRefreshToken.findUnique({
            where: {
                id: refreshTokenPayload.jti,
            },
        })

        if (!token) {
            throw new UnprocessableEntityException({
                message: 'REFRESH_TOKEN_NOT_FOUND',
                description: 'Refresh token not found in database',
            })
        }

        if (token.isRevoked) {
            throw new UnprocessableEntityException({
                message: 'REFRESH_TOKEN_REVOKED',
                description: 'User has already used this refresh token',
            })
        }

        const user = await this.prisma.authUser.findUnique({
            where: {
                id: token.userId,
            },
            include: {
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        if (!user) {
            throw new UnprocessableEntityException(`REFRESH_TOKEN_MALFORMED`)
        }

        const { id } = user

        const accessToken = await this.tokens.generateAccessToken(
            id,
            user.role.name,
        )
        const newRefreshToken = await this.tokens.generateRefreshToken(
            id,
            user.role.name,
        )

        await this.prisma.authRefreshToken.update({
            where: {
                id: token.id,
            },
            data: {
                isRevoked: true,
            },
        })

        return {
            userId: id,
            accessToken,
            refreshToken: newRefreshToken,
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
