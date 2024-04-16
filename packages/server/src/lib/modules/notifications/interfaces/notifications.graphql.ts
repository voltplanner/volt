import { Field, InputType, ObjectType } from '@nestjs/graphql'

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
export class NotificationWebResponse {
    @Field()
    userId: string

    @Field()
    topic: string

    @Field()
    message: string

    @Field({ nullable: true })
    link?: string
}
