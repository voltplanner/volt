import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskEffortIntegrationEffortDeleteInput {
    @Field(() => String)
    readonly id!: string
}
