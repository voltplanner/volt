import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AUTH_CONFIG, AuthConfig } from '../auth.config'
import { AccessTokenPayload } from '../interfaces/auth.interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
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
        console.log(payload)
        return true
    }
}
