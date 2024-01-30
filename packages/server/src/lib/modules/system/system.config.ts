import { ConfigurableModuleBuilder } from '@nestjs/common'
import { merge } from 'lodash'

export interface SystemConfig {
    temp?: boolean
}

export const DEFAULT_SYSTEM_CONFIG: Pick<SystemConfig, 'temp'> = {
    temp: false,
}

export function patchSystemConfig(
    config: Pick<
        typeof SYSTEM_OPTIONS_TYPE,
        keyof typeof DEFAULT_SYSTEM_CONFIG
    >,
) {
    if (config) {
        Object.assign(
            config,
            merge(DEFAULT_SYSTEM_CONFIG, config),
        ) as typeof SYSTEM_OPTIONS_TYPE
    }
    return config
}

export const {
    ConfigurableModuleClass: SystemConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: SYSTEM_CONFIG,
    ASYNC_OPTIONS_TYPE: SYSTEM_ASYNC_OPTIONS_TYPE,
    OPTIONS_TYPE: SYSTEM_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<SystemConfig, 'forRoot'>({
    optionsInjectionToken: `SYSTEM_CONFIG`,
}).build()
