import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { SendEmailPayload } from '../interfaces/notifications.interfaces'

@Injectable()
export class NotificationsEmailService {
    constructor(private readonly mailer: MailerService) {}

    async send(data: SendEmailPayload) {
        const { email, message, topic } = data

        await this.mailer.sendMail({
            to: email,
            subject: topic,
            html: `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width" />
              <title>${topic}</title>
            </head>
            <body>
                ${message}
            </body>`,
        })
    }
}
