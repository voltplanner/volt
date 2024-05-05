import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Logger } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { createEventEmitterPublisher } from '@shelfjs/events/src/lib/services/event-emitter-events.service'
import * as dotenv from 'dotenv'
import { execa } from 'execa'
import { GraphQLFormattedError } from 'graphql'
import { Client } from 'pg'
import { GenericContainer } from 'testcontainers'

import { defaultAllowPermissions } from '../../../../../../../../packages/server/src/environments/permissions'
import { AuthModule } from '../../../../../../../../packages/server/src/lib/modules/auth/auth.module'
import { TaskModule } from '../../../../../../../../packages/server/src/lib/modules/task/task.module'
import {
    PrismaModule,
    PrismaService,
    PrismaServiceWithExtentionsType,
} from '../../../../../../../../packages/server/src/lib/shared/prisma'
import { ProjectIntegrationResolver } from '../../project-integration.resolver'

dotenv.config()

// POSTGRES DB
const POSTGRES_PORT = 5432
const POSTGRES_DB = 'postgres'
const POSTGRES_USER = 'postgres'
const POSTGRES_PASSWORD = 'postgres'

async function setupDb() {
    const containerDb = await new GenericContainer('postgres:15.5')
        .withExposedPorts(POSTGRES_PORT)
        .withEnvironment({ POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD })
        .start()

    await new Promise((resolve) => setTimeout(resolve, 5000))

    const pgConfig = {
        user: POSTGRES_USER,
        host: containerDb.getHost(),
        password: POSTGRES_PASSWORD,
        port: containerDb.getMappedPort(POSTGRES_PORT),
        database: POSTGRES_DB,
        idleTimeoutMillis: 0,
    }

    const client = new Client(pgConfig)

    await client.connect()
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    await client.end()

    const databaseUrl = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${containerDb.getHost()}:${containerDb.getMappedPort(
        POSTGRES_PORT,
    )}/${POSTGRES_DB}?schema=public`

    await execa(`npx`, ['nx', 'run', 'server:prisma:db:push'], {
        env: { DATABASE_URL: databaseUrl },
    })
    
    return { containerDb, databaseUrl }
}

export async function setup() {
    const { containerDb, databaseUrl } = await setupDb()

    const moduleFixture = await Test.createTestingModule({
        imports: [
            PrismaModule.forRoot({
                url: databaseUrl,
            }),
            EventEmitterModule.forRoot({
                global: true,
            }),
            JwtModule.register({
                global: true,
            }),
            GraphQLModule.forRoot<ApolloDriverConfig>({
                driver: ApolloDriver,
                fieldResolverEnhancers: ['interceptors'],
                playground: false,
                introspection: true,
                subscriptions: {
                    'graphql-ws': true,
                },
                autoSchemaFile: true,
                formatError: (formattedError: GraphQLFormattedError, error: any) => {
                    if (error?.originalError?.code && formattedError?.extensions) {
                        formattedError.extensions.stacktrace = undefined
                        formattedError.extensions.metadata = error.originalError.metadata
                        formattedError.extensions.code = error.originalError.code
                        formattedError.extensions.name = error.originalError.name
                    }
    
                    return formattedError
                },
            }),
            AuthModule.forRoot({
                adminEmail: 'admin@volt.com',
                adminPassword: 'admin',
                jwt: {
                    issuerUrl: 'http://localhost',
                    audienceUrl: 'http://localhost',
                    accessTokenTTL: 15 * 60,
                    refreshTokenTTL: 60 * 60,
                    secret: 'secret',
                },
                defaultAllowPermissions,
                eventsProvider: createEventEmitterPublisher(),
            }),
            TaskModule.forRoot({
                eventsProvider: createEventEmitterPublisher(),
            }),
        ],
        providers: [ProjectIntegrationResolver],
    }).compile()

    const app = moduleFixture.createNestApplication()

    app.useLogger(new Logger())

    await app.listen(9999)

    const prisma = app.get<PrismaServiceWithExtentionsType>(PrismaService)

    return {
        app,
        prisma,
        databaseUrl,
        containerDb,
    }
}
