import { DynamicModule, Module, Provider, Type } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import {
    AUTH_CONFIG,
    AUTH_OPTIONS_TYPE,
    AuthConfigurableModuleClass,
    patchAuthConfig,
} from './auth.config'
import { AuthResolver } from './resolvers/auth.resolver'
import { AuthAdminService } from './services/auth-admin.service'
import { AuthEventsService } from './services/auth-events.service'
import { AuthTokensService } from './services/auth-tokens.service'
import { AuthUserService } from './services/auth-user.service'
import { AdminStrategy } from './strategies/admin.strategy'
import { MemberStrategy } from './strategies/member.strategy'
import { OwnerStrategy } from './strategies/owner.strategy'

@Module({})
export class AuthModule extends AuthConfigurableModuleClass {
    static forRoot(options: typeof AUTH_OPTIONS_TYPE): DynamicModule {
        const imports: any[] = [JwtModule]
        const controllers: Type<any>[] = []
        const exports: any[] = [AUTH_CONFIG, AuthEventsService]
        const providers: Provider[] = [
            {
                provide: AUTH_CONFIG,
                useValue: patchAuthConfig(options),
            },
            AuthUserService,
            AuthTokensService,
            OwnerStrategy,
            AdminStrategy,
            MemberStrategy,
            AuthResolver,
            AuthEventsService,
            AuthAdminService,
        ]

        return {
            module: AuthModule,
            imports,
            controllers,
            providers,
            exports,
        }
    }
}
