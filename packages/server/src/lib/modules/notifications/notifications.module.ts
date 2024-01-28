import { DynamicModule, Module, Provider, Type } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'

import {
    NOTIFICATIONS_CONFIG,
    NOTIFICATIONS_OPTIONS_TYPE,
    NotificationsConfigurableModuleClass,
    patchNotificationsConfig,
} from './notifications.config'
import { NotificationsService } from './services/notifications.service'

@Module({})
export class NotificationsModule extends NotificationsConfigurableModuleClass {
    static forRoot(options: typeof NOTIFICATIONS_OPTIONS_TYPE): DynamicModule {
        const imports: any[] = [
            MailerModule.forRootAsync({
                useFactory: () => options,
            }),
        ]
        const controllers: Type<any>[] = []
        const exports: any[] = [NotificationsService]
        const providers: Provider[] = [
            {
                provide: NOTIFICATIONS_CONFIG,
                useValue: patchNotificationsConfig(options),
            },
            NotificationsService,
        ]

        return {
            module: NotificationsModule,
            imports,
            controllers,
            providers,
            exports,
        }
    }
}
