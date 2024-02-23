import { NotificationTypeEnum } from '../../../shared/prisma'

export interface SendNotificationPayload {
    userId: string
    topic: string
    message: string
    link?: string
    forceSendType?: NotificationTypeEnum
}

export interface SendEmailPayload {
    email: string
    userId: string
    topic: string
    message: string
    link?: string
}

export interface LinkTelegramAccountPayload {
    chatId: number
    userId: string
}

export interface UnlinkTelegramAccountPayload {
    userId: string
}
