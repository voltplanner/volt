import { Injectable, Logger } from '@nestjs/common'

import { NotificationTypeEnum, PrismaService } from '../../../shared/prisma'
import { SendNotificationPayload } from '../interfaces/notifications.interfaces'
import { NotificationsEmailService } from './email.service'
import { NotificationsPreferencesService } from './preferences.service'

@Injectable()
export class NotificationsService {
    private logger = new Logger()

    constructor(
        private readonly prisma: PrismaService,
        private readonly email: NotificationsEmailService,
        private readonly preferences: NotificationsPreferencesService,
    ) {}

    async sendNotification(data: SendNotificationPayload) {
        const { message, topic, userId, link, forceSendType } = data

        const preferences = await this.preferences.getPreferences(userId)

        const notificationTypesToSend: NotificationTypeEnum[] = []

        if (forceSendType !== undefined) {
            notificationTypesToSend.push(forceSendType)
        } else {
            if (preferences.emailEnabled) {
                notificationTypesToSend.push(NotificationTypeEnum.EMAIL)
            }

            if (preferences.telegramEnabled) {
                notificationTypesToSend.push(NotificationTypeEnum.TELEGRAM)
            }

            if (preferences.webEnabled) {
                notificationTypesToSend.push(NotificationTypeEnum.WEB)
            }
        }

        for (const type of notificationTypesToSend) {
            const createdNotification = await this.prisma.notification.create({
                data: {
                    type,
                    sent: false,
                    topic,
                    message,
                    link,
                    Preferences: {
                        connect: {
                            externalUserId: userId,
                        },
                    },
                },
            })

            try {
                if (type === NotificationTypeEnum.EMAIL) {
                    await this.email.send({
                        email: preferences.email,
                        userId,
                        topic,
                        message,
                    })
                }
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
}
