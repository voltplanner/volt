import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskIntegrationTaskInput {
    @Field(() => String)
    readonly id: string
}
