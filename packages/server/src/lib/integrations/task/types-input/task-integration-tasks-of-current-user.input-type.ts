import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskIntegrationMyTasksInput {
    @Field(() => String, { nullable: true })
    projectId?: string | null

    @Field(() => Number, { nullable: true })
    curPage?: number | null

    @Field(() => Number, { nullable: true })
    perPage?: number | null
}
