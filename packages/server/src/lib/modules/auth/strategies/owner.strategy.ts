import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { RoleEnum } from '../../shared/prisma'
import { AUTH_CONFIG, AuthConfig } from '../auth.config'

export interface AccessTokenPayload {
    role: RoleEnum
    sub: string
}

@Injectable()
export class OwnerStrategy extends PassportStrategy(Strategy, 'owner') {
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

        if (role !== RoleEnum.OWNER) {
            // TODO: Errors
            throw new Error('Not an owner')
        }

        return true
    }
}
