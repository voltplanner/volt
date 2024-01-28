import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthUserRoleEnum } from '../../shared/prisma'
import { AUTH_CONFIG, AuthConfig } from '../auth.config'
import { AccessTokenPayload } from '../interfaces/auth.interfaces'

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
    constructor(
        @Inject(AUTH_CONFIG)
        private readonly config: AuthConfig,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwt.secret,
            signOptions: {
                expiresIn: config.jwt.accessTokenTTL,
            },
        })
    }

    async validate(payload: AccessTokenPayload): Promise<boolean> {
        const { role } = payload

        if (role !== AuthUserRoleEnum.ADMIN) {
            throw new ForbiddenException('Not an admin')
        }

        return true
    }
}
