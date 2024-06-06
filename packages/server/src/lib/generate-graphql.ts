import { NestFactory } from '@nestjs/core'
import {
    GraphQLSchemaBuilderModule,
    GraphQLSchemaFactory,
} from '@nestjs/graphql'
import { writeFileSync } from 'fs'
import { printSchema } from 'graphql'
import { join } from 'path'

import { ProjectIntegrationResolver } from './integrations/project/project-integration.resolver'
import { TaskIntegrationResolver } from './integrations/task/task-integration.resolver'
import { TaskCommentIntegrationResolver } from './integrations/task-comment/task-comment-integration.resolver'
import { TaskEffortIntegrationResolver } from './integrations/task-effort/task-effort-integration.resolver'
import { AuthResolver } from './modules/auth/resolvers/auth.resolver'
import { FilesResolver } from './modules/files/resolvers/files.resolver'
import { NotificationsResolver } from './modules/notifications/resolvers/notifications.resolver'

export async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([
        AuthResolver,
        NotificationsResolver,
        ProjectIntegrationResolver,
        TaskIntegrationResolver,
        FilesResolver,
        TaskCommentIntegrationResolver,
        TaskEffortIntegrationResolver,
    ])

    writeFileSync(join(process.cwd(), '/schema.graphql'), printSchema(schema))

    console.log('Graphql schema was generated successfuly!')
}

generateSchema()
