import * as AWS from '@aws-sdk/client-s3'
import { ConfigurableModuleBuilder } from '@nestjs/common'
import { merge } from 'lodash'

export interface FilesConfig {
    awsS3Region: string
    awsS3BucketName: string
    awsS3AccessKeyId: string
    awsS3SecretAccessKey: string
    awsS3ForcePathStyle: boolean
    awsS3AccelerateUrl?: string
    awsS3UploadBucketUrl: string
    awsS3Acl: AWS.ObjectCannedACL
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
