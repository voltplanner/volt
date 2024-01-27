import { get } from 'env-var'

export const environment = {
    production: true,
    databaseUrl: get('DATABASE_URL').required().asUrlString(),
    adminEmail: get('ADMIN_EMAIL').required().asEmailString(),
    adminPassword: get('ADMIN_PASSWORD').required().asString(),
    jwt: {
        issuerUrl: get('JWT_ISSUER_URL').required().asUrlString(),
        audienceUrl: get('JWT_AUDIENCE_URL').required().asUrlString(),
        accessTokenTTL: get('JWT_ACCESS_TOKEN_TTL').required().asInt(),
        refreshTokenTTL: get('JWT_REFRESH_TOKEN_TTL').required().asInt(),
        secret: get('JWT_SECRET').required().asString(),
    },
}
