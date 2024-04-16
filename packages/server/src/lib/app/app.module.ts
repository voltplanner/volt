import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import {
    createEventEmitterListener,
    createEventEmitterPublisher,
} from '@shelfjs/events/src/lib/services/event-emitter-events.service'
import { join } from 'path'

import { environment } from '../../environments/environment'
import { defaultAllowPermissions } from '../../environments/permissions'
import { NotificationsIntegration } from '../integrations/notifications.integration'
import { ProjectIntegrationModule } from '../integrations/project/project-integration.module'
import { TaskIntegrationModule } from '../integrations/task/task-integration.module'
import { AuthModule } from '../modules/auth/auth.module'
import { AUTH_LISTENER } from '../modules/auth/configs/auth-events.config'
import { AuthUserService } from '../modules/auth/services/auth-user.service'
import { FilesModule } from '../modules/files/files.module'
import { NotificationsModule } from '../modules/notifications/notifications.module'
import { PrismaModule } from '../shared/prisma'

@Module({
    imports: [
        EventEmitterModule.forRoot({
            global: true,
        }),
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
            subscriptions: {
                'graphql-ws': true,
            },
        }),
        AuthModule.forRoot({
            adminEmail: environment.adminEmail,
            adminPassword: environment.adminPassword,
            jwt: environment.jwt,
            defaultAllowPermissions,
            eventsProvider: createEventEmitterPublisher(),
        }),
        NotificationsModule.forRoot({
            defaults: environment.notifications.defaults,
            transport: environment.notifications.transport,
            telegram: environment.notifications.telegram,
        }),
        FilesModule.forRoot(environment.s3Storage),
        TaskIntegrationModule,
        ProjectIntegrationModule,
    ],
    controllers: [],
    providers: [
        NotificationsIntegration,
        createEventEmitterListener({
            injectionToken: AUTH_LISTENER,
        }),
    ],
})
export class AppModule {}
