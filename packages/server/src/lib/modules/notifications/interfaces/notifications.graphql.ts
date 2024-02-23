import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LinkTelegramAccountInput {
    @Field()
    chatId: number
}
