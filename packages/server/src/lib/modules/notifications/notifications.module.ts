import { DynamicModule, Module, Provider } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'

import {
    NOTIFICATIONS_ASYNC_OPTIONS_TYPE,
    NOTIFICATIONS_CONFIG,
    NOTIFICATIONS_OPTIONS_TYPE,
    NotificationsConfigurableModuleClass,
    patchNotificationsConfig,
} from './configs/notifications-module.config'
import { NotificationsResolver } from './resolvers/notifications.resolver'
import { NotificationsEmailService } from './services/email.service'
import { NotificationsService } from './services/notifications.service'
import { NotificationsPreferencesService } from './services/preferences.service'
import { NotificationsTelegramService } from './services/telegram.service'

@Module({})
export class NotificationsModule extends NotificationsConfigurableModuleClass {
    static forRoot(options: typeof NOTIFICATIONS_OPTIONS_TYPE): DynamicModule {
        return {
            ...this.forRootAsync({
                useFactory: async () => options,
            }),
        }
    }

    static forRootAsync(
        options?: typeof NOTIFICATIONS_ASYNC_OPTIONS_TYPE,
    ): DynamicModule {
        const useFactory = options?.useFactory
        const useClass = options?.useClass

        const imports: any[] = [
            ...(options?.imports ?? []),
            MailerModule.forRootAsync({
                useFactory,
            }),
        ]

        const providers: Provider[] = [
            NotificationsService,
            NotificationsPreferencesService,
            NotificationsEmailService,
            NotificationsTelegramService,
            NotificationsResolver,
        ]

        return {
            module: NotificationsModule,
            imports,
            controllers: [],
            providers: [
                ...providers,
                ...(useClass
                    ? [
                          {
                              provide: `${String(NOTIFICATIONS_CONFIG)}_TEMP`,
                              useClass,
                          },
                          {
                              provide: NOTIFICATIONS_CONFIG,
                              useFactory: async (config) =>
                                  patchNotificationsConfig(config),
                              inject: [`${String(NOTIFICATIONS_CONFIG)}_TEMP`],
                          },
                      ]
                    : []),
                ...(useFactory
                    ? [
                          {
                              provide: NOTIFICATIONS_CONFIG,
                              useFactory: async (...args) =>
                                  patchNotificationsConfig(
                                      await useFactory(...args),
                                  ),
                              inject: options?.inject || [],
                          },
                      ]
                    : [
                          {
                              provide: NOTIFICATIONS_CONFIG,
                              useValue: patchNotificationsConfig({}),
                          },
                      ]),
            ],
            exports: [NOTIFICATIONS_CONFIG, ...providers],
        }
    }
}
