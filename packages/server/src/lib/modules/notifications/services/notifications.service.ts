import { Injectable, Logger } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { NotificationTypeEnum, PrismaService } from '../../shared/prisma'
import { SendNotificationPayload } from '../interfaces/notifications.interfaces'

@Injectable()
export class NotificationsService {
    private logger = new Logger()

    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailerService,
    ) {}

    async sendNotification(data: SendNotificationPayload) {
        const { message, topic, type, userId, link } = data

        const createdNotification = await this.prisma.notification.create({
            data: {
                type,
                sent: false,
                topic,
                message,
                link,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        })

        if (type === NotificationTypeEnum.EMAIL) {
            try {
                const { email } = await this.prisma.authUser.findUnique({
                    where: {
                        id: userId,
                    },
                    select: {
                        email: true,
                    },
                })

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
            } catch (error) {
                this.logger.error(
                    `Can't send messsage to email. Reason ${error.message}`,
                )
                await this.prisma.notification.update({
                    where: {
                        id: createdNotification.id,
                    },
                    data: {
                        sent: false,
                        error: error.message,
                    },
                })
            }
        }

        await this.prisma.notification.update({
            where: {
                id: createdNotification.id,
            },
            data: {
                sent: true,
                sentAt: new Date(),
            },
        })
    }
}
