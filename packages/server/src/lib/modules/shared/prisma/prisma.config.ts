import { ConfigurableModuleBuilder } from '@nestjs/common'
import { merge } from 'lodash'

export interface PrismaConfig {
    url: string
    logging?: 'all_queries' | 'long_queries'
    maxQueryExecutionTime?: number
}

export const DEFAULT_PRISMA_CONFIG: Pick<
    PrismaConfig,
    'logging' | 'maxQueryExecutionTime'
> = {
    logging: 'long_queries',
    maxQueryExecutionTime: 5000,
}

export function patchPrismaConfig(
    config: Pick<
        typeof PRISMA_OPTIONS_TYPE,
        keyof typeof DEFAULT_PRISMA_CONFIG
    >,
) {
    if (config) {
        Object.assign(
            config,
            merge(DEFAULT_PRISMA_CONFIG, config),
        ) as typeof PRISMA_OPTIONS_TYPE
    }
    return config
}

export const {
    ConfigurableModuleClass: PrismaConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: PRISMA_CONFIG,
    ASYNC_OPTIONS_TYPE: PRISMA_ASYNC_OPTIONS_TYPE,
    OPTIONS_TYPE: PRISMA_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PrismaConfig, 'forRoot'>({
    optionsInjectionToken: `PRISMA_CONFIG`,
}).build()
