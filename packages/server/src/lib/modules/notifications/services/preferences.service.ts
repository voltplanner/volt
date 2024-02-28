import { BadRequestException, Injectable } from '@nestjs/common'

import { PrismaService } from '../../../shared/prisma'
import { ChangePreferences } from '../interfaces/notifications.interfaces'
import { NotificationsTelegramService } from './telegram.service'

@Injectable()
export class NotificationsPreferencesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly telegram: NotificationsTelegramService,
    ) {}

    async getPreferences(externalUserId: string) {
        const preferences =
            await this.prisma.notificationPreferences.findUnique({
                where: {
                    externalUserId,
                },
            })

        if (!preferences) {
            return await this.prisma.notificationPreferences.create({
                data: {
                    externalUserId,
                    emailEnabled: false,
                    webEnabled: true,
                    telegramEnabled: false,
                },
            })
        }

        return preferences
    }

    async changePreferences(data: ChangePreferences) {
        const { userId, ...dataToUpdate } = data

        if (
            data.telegramEnabled === true &&
            (data.telegramAccount === undefined ||
                data.telegramAccount === null)
        ) {
            throw new BadRequestException('Telegram account is not specified')
        }

        if (
            data.emailEnabled === true &&
            (data.email === undefined || data.email === null)
        ) {
            throw new BadRequestException('Email is not specified')
        }

        if (data.telegramEnabled === false) {
            data['telegramAccount'] = null
        }

        if (data.emailEnabled === false) {
            data['email'] = null
        }

        await this.prisma.notificationPreferences.update({
            where: {
                externalUserId: userId,
            },
            data: {
                ...dataToUpdate,
            },
        })

        if (data.telegramEnabled === true) {
            await this.telegram.send({
                telegramAccount: data.telegramAccount,
                topic: 'You will now receive notifications here',
                message: '',
            })
        }
    }
}
