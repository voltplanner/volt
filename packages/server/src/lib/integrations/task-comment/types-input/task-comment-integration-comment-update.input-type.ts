import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskCommentIntegrationCommentUpdateInput {
    @Field(() => String)
    readonly id: string
    
    @Field(() => String)
    readonly text: string
}
