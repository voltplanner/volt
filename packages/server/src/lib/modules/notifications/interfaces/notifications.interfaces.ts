import { NotificationTypeEnum } from '../../shared/prisma'

export interface SendNotificationPayload {
    type: NotificationTypeEnum
    userId: string
    topic: string
    message: string
    link?: string
}
