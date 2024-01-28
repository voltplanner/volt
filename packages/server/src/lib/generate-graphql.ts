import { NestFactory } from '@nestjs/core'
import {
    GraphQLSchemaBuilderModule,
    GraphQLSchemaFactory,
} from '@nestjs/graphql'
import { writeFileSync } from 'fs'
import { printSchema } from 'graphql'
import { join } from 'path'

import { AuthResolver } from './modules/auth/resolvers/auth.resolver'

export async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([AuthResolver])

    writeFileSync(join(process.cwd(), '/schema.graphql'), printSchema(schema))

    console.log('Graphql schema was generated successfuly!')
}

generateSchema()
