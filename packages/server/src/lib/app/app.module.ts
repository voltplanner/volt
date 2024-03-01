import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { join } from 'path'

import { environment } from '../../environments/environment'
import { defaultAllowPermissions } from '../../environments/permissions'
import { AuthIntegration } from '../integrations/auth.integration'
import { AuthModule } from '../modules/auth/auth.module'
import { NotificationsModule } from '../modules/notifications/notifications.module'
import { RxJsEventsService } from '../shared/events/rxjs-events.service'
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
            eventsProvider: RxJsEventsService,
        }),
        NotificationsModule.forRoot({
            defaults: environment.notifications.defaults,
            transport: environment.notifications.transport,
            telegram: environment.notifications.telegram,
        }),
    ],
    controllers: [],
    providers: [AuthIntegration],
})
export class AppModule {}
