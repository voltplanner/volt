import {
    Inject,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignOptions, TokenExpiredError } from 'jsonwebtoken'

import { PrismaService } from '../../../shared/prisma'
import { AUTH_CONFIG, AuthConfig } from '../configs/auth-module.config'
import { RefreshTokenPayload } from '../interfaces/auth.interfaces'

@Injectable()
export class AuthTokensService {
    constructor(
        @Inject(AUTH_CONFIG)
        private readonly config: AuthConfig,
        private readonly jwt: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    async generateAccessToken(userId: string, role: string): Promise<string> {
        const signOptions: SignOptions = {
            issuer: this.config.jwt.issuerUrl,
            audience: this.config.jwt.issuerUrl,
            expiresIn: this.config.jwt.accessTokenTTL,
            subject: userId,
        }

        return await this.jwt.signAsync(
            {
                role,
            },
            {
                ...signOptions,
                secret: this.config.jwt.secret,
            },
        )
    }

    async generateRefreshToken(userId: string, role: string): Promise<string> {
        const refreshToken = await this.prisma.authRefreshToken.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                expiresAt: new Date(
                    Date.now() + this.config.jwt.accessTokenTTL * 1000,
                ),
            },
        })

        const opts: SignOptions = {
            issuer: this.config.jwt.issuerUrl,
            audience: this.config.jwt.issuerUrl,
            expiresIn: this.config.jwt.refreshTokenTTL,
            subject: userId,
            jwtid: refreshToken.id,
        }

        return await this.jwt.signAsync(
            {
                role,
            },
            {
                ...opts,
                secret: this.config.jwt.secret,
            },
        )
    }

    async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
        try {
            return await this.jwt.decode(token)
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnprocessableEntityException('Refresh token expired')
            }

            throw new UnprocessableEntityException(
                'Token is not valid configuration',
            )
        }
    }

    get accessTokenTTL(): number {
        return this.config.jwt.accessTokenTTL
    }

    get refreshTokenTTL(): number {
        return this.config.jwt.refreshTokenTTL
    }
}
