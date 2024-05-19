import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskCommentIntegrationCommentsInput {
    @Field(() => String)
    taskId: string

    @Field(() => Number, { nullable: true })
    curPage?: number | null

    @Field(() => Number, { nullable: true })
    perPage?: number | null
}
