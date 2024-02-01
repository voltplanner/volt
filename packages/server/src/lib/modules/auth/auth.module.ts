import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import { DynamicModule, Module, Provider, Type } from '@nestjs/common'

import {
    AUTH_CONFIG,
    AUTH_OPTIONS_TYPE,
    AuthConfigurableModuleClass,
    patchAuthConfig,
} from './auth.config'
import { AuthResolver } from './resolvers/auth.resolver'
import { AuthAdminService } from './services/auth-admin.service'
import { AuthBootstrapService } from './services/auth-bootstrap.service'
import { AuthEventsService } from './services/auth-events.service'
import { AuthRoleService } from './services/auth-role.service'
import { AuthTokensService } from './services/auth-tokens.service'
import { AuthUserService } from './services/auth-user.service'

@Module({})
export class AuthModule extends AuthConfigurableModuleClass {
    static forRoot(options: typeof AUTH_OPTIONS_TYPE): DynamicModule {
        const imports: any[] = [DiscoveryModule]
        const controllers: Type<any>[] = []
        const exports: any[] = [AUTH_CONFIG, AuthEventsService]
        const providers: Provider[] = [
            {
                provide: AUTH_CONFIG,
                useValue: patchAuthConfig(options),
            },
            AuthUserService,
            AuthTokensService,
            AuthResolver,
            AuthEventsService,
            AuthAdminService,
            AuthRoleService,
            AuthBootstrapService,
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
