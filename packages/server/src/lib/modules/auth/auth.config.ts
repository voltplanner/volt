import { ConfigurableModuleBuilder } from '@nestjs/common'
import { merge } from 'lodash'

import { EventsServiceInterfaceConstructor } from '../../shared/events/interfaces/events.interfaces'

export const AUTH_EVENTS = 'AUTH_EVENTS'

export interface AuthDefaultPermissions {
    methodName: string
    roleName: string
    editable?: boolean
}

export interface AuthConfig {
    adminEmail: string
    adminPassword: string
    jwt: {
        secret: string
        issuerUrl: string
        audienceUrl: string
        accessTokenTTL: number
        refreshTokenTTL: number
    }
    defaultAllowPermissions: AuthDefaultPermissions[]
    eventsProvider: EventsServiceInterfaceConstructor
    temp?: boolean
}

export const DEFAULT_AUTH_CONFIG: Pick<AuthConfig, 'temp'> = {
    temp: false,
}

export function patchAuthConfig(
    config: Pick<typeof AUTH_OPTIONS_TYPE, keyof typeof DEFAULT_AUTH_CONFIG>,
) {
    if (config) {
        Object.assign(
            config,
            merge(DEFAULT_AUTH_CONFIG, config),
        ) as typeof AUTH_OPTIONS_TYPE
    }
    return config
}

export const {
    ConfigurableModuleClass: AuthConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: AUTH_CONFIG,
    ASYNC_OPTIONS_TYPE: AUTH_ASYNC_OPTIONS_TYPE,
    OPTIONS_TYPE: AUTH_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AuthConfig, 'forRoot'>({
    optionsInjectionToken: `AUTH_CONFIG`,
}).build()
