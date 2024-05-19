import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskEffortIntegrationEffortCreateInput {
    @Field(() => String)
    readonly taskId!: string

    @Field(() => Number)
    readonly value!: number

    @Field(() => String)
    readonly description!: string
}
