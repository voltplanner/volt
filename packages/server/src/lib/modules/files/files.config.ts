import { ConfigurableModuleBuilder } from '@nestjs/common'
import { merge } from 'lodash'

export interface FilesConfig {
    production: boolean
    s3StorageUrl: string
    s3StorageRegion: string
    s3StorageBucketName: string
    s3StorageAccessKeyId: string
    s3StorageSecretAccessKey: string
}

export const DEFAULT_FILES_CONFIG = {}

export function patchFilesConfig(
    config: Pick<typeof FILES_OPTIONS_TYPE, keyof typeof DEFAULT_FILES_CONFIG>,
) {
    if (config) {
        Object.assign(
            config,
            merge(DEFAULT_FILES_CONFIG, config),
        ) as typeof FILES_OPTIONS_TYPE
    }
    return config
}

export const {
    ConfigurableModuleClass: FilesConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: FILES_CONFIG,
    ASYNC_OPTIONS_TYPE: FILES_ASYNC_OPTIONS_TYPE,
    OPTIONS_TYPE: FILES_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<FilesConfig, 'forRoot'>({
    optionsInjectionToken: `FILES_CONFIG`,
}).build()
