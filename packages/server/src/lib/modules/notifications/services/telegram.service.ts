import { Inject, Injectable } from '@nestjs/common'
import { Api, Bot, Context, RawApi } from 'grammy'

import { PrismaService } from '../../../shared/prisma'
import {
    LinkTelegramAccountPayload,
    SendEmailPayload,
    UnlinkTelegramAccountPayload,
} from '../interfaces/notifications.interfaces'
import {
    NOTIFICATIONS_CONFIG,
    NotificationsConfig,
} from '../notifications.config'
import { NotificationsPreferencesService } from './preferences.service'

@Injectable()
export class NotificationsTelegramService {
    private isTelegramConfigured = false
    private telegramBot: Bot<Context, Api<RawApi>>

    constructor(
        @Inject(NOTIFICATIONS_CONFIG)
        private readonly config: NotificationsConfig,
        private readonly prisma: PrismaService,
        private readonly preferences: NotificationsPreferencesService,
    ) {}

    async onModuleInit() {
        if (!this.config.telegram.botToken) {
            this.isTelegramConfigured = false
            return
        }

        this.telegramBot = new Bot(this.config.telegram.botToken)
        this.isTelegramConfigured = true

        this.telegramBot.command('start', (ctx) => {
            const authorizeUrl = this.generateLink(ctx.chat.id)

            return ctx.reply(
                `Hello, to enable notifications via Telegram, [authorize within this link](${authorizeUrl})!`,
            )
        })
    }

    async send(data: SendEmailPayload) {
        const { userId, message, topic } = data

        if (!this.isTelegramConfigured) {
            return
        }

        const preferences = await this.preferences.getPreferences(userId)

        await this.telegramBot.api.sendMessage(
            preferences.telegramAccount,
            `${topic}\n\n${message}`,
        )
    }

    generateLink(chatId: number) {
        return `${this.config.telegram.rootUrl}/telegram?chatId=${chatId}`
    }

    async linkTelegramAccount(data: LinkTelegramAccountPayload) {
        const { chatId, userId } = data

        const preferences = await this.preferences.getPreferences(userId)

        await this.prisma.notificationPreferences.update({
            where: {
                id: preferences.id,
            },
            data: {
                telegramEnabled: true,
                telegramAccount: chatId,
            },
        })
    }

    async unlinkTelegramAccount(data: UnlinkTelegramAccountPayload) {
        const { userId } = data

        const preferences = await this.preferences.getPreferences(userId)

        await this.prisma.notificationPreferences.update({
            where: {
                id: preferences.id,
            },
            data: {
                telegramEnabled: false,
                telegramAccount: null,
            },
        })
    }
}
