import { Injectable, Logger } from '@nestjs/common'

import { NotificationTypeEnum, PrismaService } from '../../../shared/prisma'
import { SendNotificationPayload } from '../interfaces/notifications.interfaces'
import { NotificationsEmailService } from './email.service'
import { NotificationsPreferencesService } from './preferences.service'
import { NotificationsTelegramService } from './telegram.service'
import { NotificationsWebService } from './web.service'

@Injectable()
export class NotificationsService {
    private logger = new Logger()

    constructor(
        private readonly prisma: PrismaService,
        private readonly email: NotificationsEmailService,
        private readonly telegram: NotificationsTelegramService,
        private readonly web: NotificationsWebService,
        private readonly preferences: NotificationsPreferencesService,
    ) {}

    async sendNotification(data: SendNotificationPayload) {
        const { message, topic, userId, link } = data

        const preferences = await this.preferences.getPreferences(userId)

        const notificationTypesToSend: NotificationTypeEnum[] = []

        if (preferences.emailEnabled) {
            notificationTypesToSend.push(NotificationTypeEnum.EMAIL)
        }

        if (preferences.telegramEnabled) {
            notificationTypesToSend.push(NotificationTypeEnum.TELEGRAM)
        }

        if (preferences.webEnabled) {
            notificationTypesToSend.push(NotificationTypeEnum.WEB)
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
                        topic,
                        message,
                        link,
                    })
                }

                if (type === NotificationTypeEnum.TELEGRAM) {
                    await this.telegram.send({
                        telegramAccount: preferences.telegramAccount,
                        topic,
                        message,
                        link,
                    })
                }

                if (type === NotificationTypeEnum.WEB) {
                    await this.web.send({
                        userId,
                        topic,
                        message,
                        link,
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

    async sendForceEmailNotification(
        data: SendNotificationPayload & { email: string },
    ) {
        const { message, topic, userId, link, email } = data

        await this.preferences.getPreferences(userId)

        const createdNotification = await this.prisma.notification.create({
            data: {
                type: NotificationTypeEnum.EMAIL,
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
            await this.email.send({
                email,
                topic,
                message,
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
