import { parseConnectionUrl } from 'nodemailer/lib/shared'
import SMTPConnection, { Credentials } from 'nodemailer/lib/smtp-connection'

export function parseSmtpConnectionUrl(
    connectionsString: string,
): SMTPConnection.Options {
    const connection = parseConnectionUrl(connectionsString)
    if (connection.auth) {
        const pass = (connection.auth as Credentials).pass
            .split('SLASH')
            .join('/')
        return {
            ...connection,
            auth: {
                ...connection.auth,
                pass,
            } as Credentials,
        }
    }
    return connection
}
