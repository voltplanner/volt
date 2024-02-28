import { Inject, Injectable, Logger } from '@nestjs/common'
import { Api, Bot, Context, RawApi } from 'grammy'

import {
    NOTIFICATIONS_CONFIG,
    NotificationsConfig,
} from '../configs/notifications-module.config'
import { SendTelegramPayload } from '../interfaces/notifications.interfaces'

@Injectable()
export class NotificationsTelegramService {
    private logger = new Logger()
    private isTelegramConfigured = false
    private telegramBot: Bot<Context, Api<RawApi>>

    constructor(
        @Inject(NOTIFICATIONS_CONFIG)
        private readonly config: NotificationsConfig,
    ) {}

    async onModuleInit() {
        if (!this.config.telegram.botToken) {
            this.isTelegramConfigured = false
            return
        }

        this.telegramBot = new Bot(this.config.telegram.botToken)
        this.isTelegramConfigured = true
        this.logger.log('Telegram notification enabled')

        this.telegramBot.command('start', (ctx) => {
            const authorizeUrl = this.generateLink(ctx.chat.id)
            console.log(authorizeUrl)
            return ctx.reply(
                `Hello, to enable notifications via Telegram, [authorize within this link](${authorizeUrl})`,
                { parse_mode: 'MarkdownV2' },
            )
        })

        this.telegramBot.start().catch((error) => {
            this.isTelegramConfigured = false
            this.logger.error(error)
        })
    }

    async send(data: SendTelegramPayload) {
        const { message, topic, telegramAccount } = data

        if (!this.isTelegramConfigured) {
            return
        }

        await this.telegramBot.api.sendMessage(
            telegramAccount,
            `${topic}\n\n${message}`,
        )
    }

    generateLink(chatId: number) {
        return `${this.config.telegram.rootUrl}telegram?chatId=${chatId}`
    }
}
