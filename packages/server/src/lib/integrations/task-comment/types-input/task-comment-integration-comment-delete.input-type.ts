import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskCommentIntegrationCommentDeleteInput {
    @Field(() => String)
    readonly id: string
}
