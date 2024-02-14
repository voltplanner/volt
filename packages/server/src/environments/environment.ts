import * as AWS from '@aws-sdk/client-s3'
import { get } from 'env-var'

import { parseSmtpConnectionUrl } from '../lib/shared/utils'

export const environment = {
    production: false,
    rootUrl: get('ROOT_URL').required().asUrlString(),
    databaseUrl: get('DATABASE_URL').required().asUrlString(),
    adminEmail: get('ADMIN_EMAIL').default('admin@volt.com').asEmailString(),
    adminPassword: get('ADMIN_PASSWORD').default('admin').asString(),
    jwt: {
        issuerUrl: get('JWT_ISSUER_URL').required().asUrlString(),
        audienceUrl: get('JWT_AUDIENCE_URL').required().asUrlString(),
        accessTokenTTL: get('JWT_ACCESS_TOKEN_TTL')
            .default(15 * 60)
            .asInt(),
        refreshTokenTTL: get('JWT_REFRESH_TOKEN_TTL')
            .default(60 * 60)
            .asInt(),
        secret: get('JWT_SECRET').required().asString(),
    },
    notifications: {
        transport: parseSmtpConnectionUrl(
            get('SMTP_URL').required().asUrlString(),
        ),
        defaults: {
            from: get('SMTP_NO_REPLY_EMAIL').required().asString(),
        },
        telegram: {
            botToken: get('TELEGRAM_BOT_TOKEN').asString(),
            rootUrl: get('ROOT_URL').required().asUrlString(),
        },
    },
    awsS3Storage: {
        awsS3UploadBucketUrl: get('AWS_S3_UPLOAD_BUCKET_URL').required().asUrlString(),
        awsS3Region: get('AWS_S3_REGION').required().asString(),
        awsS3BucketName: get('AWS_S3_BUCKET_NAME')
            .required()
            .asString(),
        awsS3AccessKeyId: get('AWS_S3_ACCESS_KEY_ID').required().asString(),
        awsS3SecretAccessKey: get(
            'AWS_S3_SECRET_ACCESS_KEY',
        ).required().asString(),
        awsS3ForcePathStyle: get('AWS_S3_FORCE_PATH_STYLE').default('true').asBool(),
        awsS3AccelerateUrl: get('AWS_S3_ACCELERATE_URL').required(false).asString(),
        awsS3Acl: get('AWS_S3_ACL').asEnum(Object.values(AWS.ObjectCannedACL)),
    },
}
