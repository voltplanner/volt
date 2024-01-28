import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloFederationDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { environment } from '../environments/environment'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './modules/shared/prisma'

@Module({
    imports: [
        PrismaModule.forRoot({
            url: environment.databaseUrl,
        }),
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'schema.graphql'),
            playground: false,
            introspection: true,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        AuthModule.forRoot({
            adminEmail: environment.adminEmail,
            adminPassword: environment.adminPassword,
            jwt: environment.jwt,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
