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
            from: get('SMTP_NO_REPLY_EMAIL'),
        },
        telegram: {
            botToken: get('TELEGRAM_BOT_TOKEN').asString(),
            rootUrl: get('ROOT_URL').required().asUrlString(),
        },
    },
}
