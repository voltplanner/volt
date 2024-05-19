import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskEffortIntegrationEffortsInput {
    @Field(() => String, { nullable: true })
    taskId?: string | null

    @Field(() => Number, { nullable: true })
    curPage?: number | null

    @Field(() => Number, { nullable: true })
    perPage?: number | null
}
