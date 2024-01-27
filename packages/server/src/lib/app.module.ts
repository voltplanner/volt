import { Module } from '@nestjs/common'

import { environment } from '../environments/environment'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './modules/shared/prisma'

@Module({
    imports: [
        PrismaModule.forRoot({
            url: environment.databaseUrl,
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
