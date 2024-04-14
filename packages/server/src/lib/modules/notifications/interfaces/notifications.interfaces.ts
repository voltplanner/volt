export interface SendNotificationPayload {
    userId: string
    topic: string
    message: string
    link?: string
}

export interface SendEmailPayload {
    email: string
    topic: string
    message: string
    link?: string
}

export interface SendWebPayload {
    userId: string
    topic: string
    message: string
    link?: string
}

export interface SendTelegramPayload {
    telegramAccount: number
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

export interface ChangePreferences {
    userId: string
    emailEnabled?: boolean
    email?: string
    webEnabled?: boolean
    telegramEnabled?: boolean
    telegramAccount?: number
}
