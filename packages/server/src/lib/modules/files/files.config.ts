import * as AWS from '@aws-sdk/client-s3'
import { ConfigurableModuleBuilder } from '@nestjs/common'
import { merge } from 'lodash'

export interface FilesConfig {
    s3Region: string
    s3BucketName: string
    s3AccessKeyId: string
    s3SecretAccessKey: string
    s3ForcePathStyle: boolean
    s3AccelerateUrl?: string
    s3UploadBucketUrl: string
    s3Acl: AWS.ObjectCannedACL
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
