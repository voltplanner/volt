import { NestFactory } from '@nestjs/core'
import { Logger } from '@tinybudgie/logger'
import { get } from 'env-var'

import { environment } from '../environments/environment'
import { AppModule } from './app.module'

const logger = new Logger()

logger.configure({
    json: environment.production
})

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger })

    const globalPrefix = 'api'

    app.setGlobalPrefix(globalPrefix)

    const port = get('SERVER_PORT').default(3000).asPortNumber()
    await app.listen(port)

    logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    )
}

bootstrap()
