import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskCommentIntegrationCommentCreateInput {
    @Field(() => String)
    readonly taskId!: string

    @Field(() => String)
    readonly text!: string
}
