import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'

import { CursorBasedResponseType } from '../../../shared/graphql/shared.graphql'
import { NotificationTypeEnum } from '../../../shared/prisma'

registerEnumType(NotificationTypeEnum, {
    name: 'NotificationTypeEnum',
})

@InputType()
export class ChangeMyNotificationPreferences {
    @Field({ nullable: true })
    emailEnabled?: boolean

    @Field({ nullable: true })
    email?: string

    @Field({ nullable: true })
    webEnabled?: boolean

    @Field({ nullable: true })
    telegramEnabled?: boolean

    @Field({ nullable: true })
    telegramAccount?: number
}

@InputType()
export class MarkAsSeenInput {
    @Field()
    notificationId: string
}

@InputType()
export class MarkAllAsSeenInput {
    @Field(() => NotificationTypeEnum)
    type: NotificationTypeEnum
}

@InputType()
export class GetNotificationsInput {
    @Field({ nullable: true })
    userId?: string

    @Field({ nullable: true })
    cursor?: string

    @Field({ nullable: true })
    take?: number

    @Field(() => NotificationTypeEnum)
    type: NotificationTypeEnum

    @Field({ nullable: true })
    seen?: boolean
}

@ObjectType()
export class GetNotificationData {
    @Field()
    id: string

    @Field()
    topic: string

    @Field()
    message: string

    @Field()
    link: string

    @Field(() => NotificationTypeEnum)
    type: NotificationTypeEnum

    @Field()
    sent: boolean

    @Field()
    sentAt: Date

    @Field()
    seen: boolean
}

@ObjectType()
export class GetNotificationsResponse extends CursorBasedResponseType(
    GetNotificationData,
) {}

@ObjectType()
export class GetNotificationPreferences {
    @Field()
    emailEnabled: boolean

    @Field({ nullable: true })
    email: string

    @Field()
    webEnabled: boolean

    @Field()
    telegramEnabled: boolean

    @Field({ nullable: true })
    telegramAccount: number
}

@ObjectType()
export class OnNewNotification {
    @Field()
    userId: string

    @Field()
    topic: string

    @Field()
    message: string

    @Field({ nullable: true })
    link?: string
}
