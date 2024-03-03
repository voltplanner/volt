import { ConfigurableModuleBuilder } from '@nestjs/common'
import { MailerOptions } from '@nestjs-modules/mailer'
import { merge } from 'lodash'

export type NotificationsConfig = MailerOptions & {
    telegram?: {
        botToken?: string
        rootUrl: string
    }
    temp?: boolean
}

export const DEFAULT_NOTIFICATIONS_CONFIG: Pick<NotificationsConfig, 'temp'> = {
    temp: false,
}

export function patchNotificationsConfig(
    config: Pick<
        typeof NOTIFICATIONS_OPTIONS_TYPE,
        keyof typeof DEFAULT_NOTIFICATIONS_CONFIG
    >,
) {
    if (config) {
        Object.assign(
            config,
            merge(DEFAULT_NOTIFICATIONS_CONFIG, config),
        ) as typeof NOTIFICATIONS_OPTIONS_TYPE
    }
    return config
}

export const {
    ConfigurableModuleClass: NotificationsConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: NOTIFICATIONS_CONFIG,
    ASYNC_OPTIONS_TYPE: NOTIFICATIONS_ASYNC_OPTIONS_TYPE,
    OPTIONS_TYPE: NOTIFICATIONS_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<NotificationsConfig, 'forRoot'>({
    optionsInjectionToken: `NOTIFICATIONS_CONFIG`,
}).build()
