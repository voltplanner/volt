import { DynamicModule, Module, Provider, Type } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import {
    AUTH_CONFIG,
    AUTH_OPTIONS_TYPE,
    AuthConfigurableModuleClass,
    patchAuthConfig,
} from './auth.config'
import { AuthController } from './auth.controller'
import { AuthTokensService } from './services/auth-tokens.service'
import { AuthUserService } from './services/auth-user.service'
import { OwnerStrategy } from './strategies/owner.strategy'

@Module({})
export class AuthModule extends AuthConfigurableModuleClass {
    static forRoot(options: typeof AUTH_OPTIONS_TYPE): DynamicModule {
        const imports: any[] = [JwtModule]
        const controllers: Type<any>[] = [AuthController]
        const exports: any[] = [AUTH_CONFIG]
        const providers: Provider[] = [
            {
                provide: AUTH_CONFIG,
                useValue: patchAuthConfig(options),
            },
            AuthUserService,
            AuthTokensService,
            OwnerStrategy,
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
