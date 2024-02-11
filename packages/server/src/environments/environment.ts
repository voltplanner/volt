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
    s3Storage: {
        s3StorageUrl: get('S3_STORAGE_URL').asString(),
        s3StorageRegion: get('S3_STORAGE_REGION').asString(),
        s3StorageBucketName: get('S3_STORAGE_BUCKET_NAME')
            .default('volt')
            .asString(),
        s3StorageAccessKeyId: get('S3_STORAGE_ACCESS_KEY_ID').asString(),
        s3StorageSecretAccessKey: get(
            'S3_STORAGE_SECRET_ACCESS_KEY',
        ).asString(),
    },
}
