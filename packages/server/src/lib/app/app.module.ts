import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { join } from 'path'

import { environment } from '../../environments/environment'
import { defaultAllowPermissions } from '../../environments/permissions'
import { AuthIntegration } from '../integrations/auth.integration'
import { NotificationsIntegration } from '../integrations/notification.integration'
import { AuthModule } from '../modules/auth/auth.module'
import { AuthUserService } from '../modules/auth/services/auth-user.service'
import { NotificationsModule } from '../modules/notifications/notifications.module'
import { PrismaModule } from '../shared/prisma'

@Module({
    imports: [
        PrismaModule.forRoot({
            url: environment.databaseUrl,
        }),
        JwtModule.register({
            global: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            fieldResolverEnhancers: ['interceptors'],
            autoSchemaFile: join(process.cwd(), 'schema.graphql'),
            playground: false,
            introspection: true,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        AuthModule.forRoot({
            adminEmail: environment.adminEmail,
            adminPassword: environment.adminPassword,
            jwt: environment.jwt,
            defaultAllowPermissions,
        }),
        NotificationsModule.forRootAsync({
            useFactory: (authUserService: AuthUserService) =>
                new NotificationsIntegration(authUserService),
            inject: [AuthUserService],
        }),
    ],
    controllers: [],
    providers: [AuthIntegration],
})
export class AppModule {}
