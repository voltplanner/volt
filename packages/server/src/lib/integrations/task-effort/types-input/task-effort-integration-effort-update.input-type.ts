import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskEffortIntegrationEffortUpdateInput {
    @Field(() => String)
    readonly id!: string

    @Field(() => Number)
    readonly value!: number

    @Field(() => String)
    readonly description!: string
}
