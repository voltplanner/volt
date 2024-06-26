import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@tinybudgie/logger'
import { get } from 'env-var'
import { graphqlUploadExpress } from 'graphql-upload'

import { environment } from '../environments/environment'
import { AppModule } from './app/app.module'

const logger = new Logger()

logger.configure({
    json: environment.production,
})

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger })

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })

    // Should be disabled to upload with REST to avoid "Misordered multipart fields" error
    app.use(
        graphqlUploadExpress({
            maxFileSize: parseInt(get('AWS_S3_MAX_FILE_SIZE').asString(), 10),
            maxFiles: parseInt(get('AWS_S3_MAX_FILES').asString(), 10),
        }),
    )

    app.useGlobalPipes(new ValidationPipe())

    // app.useGlobalFilters(new GraphQLExceptionFilter());

    const port = get('SERVER_PORT').default(3000).asPortNumber()
    await app.listen(port)

    logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`)
}

bootstrap()
