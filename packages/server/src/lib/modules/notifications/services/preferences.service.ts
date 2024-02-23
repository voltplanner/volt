import { Inject, Injectable } from '@nestjs/common'

import { PrismaService } from '../../../shared/prisma'
import {
    NOTIFICATIONS_CONFIG,
    NotificationsConfig,
} from '../notifications.config'

@Injectable()
export class NotificationsPreferencesService {
    constructor(
        @Inject(NOTIFICATIONS_CONFIG)
        private readonly config: NotificationsConfig,
        private readonly prisma: PrismaService,
    ) {}

    async getPreferences(externalUserId: string) {
        const preferences =
            await this.prisma.notificationPreferences.findUnique({
                where: {
                    externalUserId,
                },
            })

        const email = await this.config.getEmailByUserId(externalUserId)

        if (!preferences) {
            return await this.prisma.notificationPreferences.create({
                data: {
                    externalUserId,
                    emailEnabled: false,
                    email,
                    webEnabled: true,
                    telegramEnabled: false,
                },
            })
        }

        return preferences
    }
}
