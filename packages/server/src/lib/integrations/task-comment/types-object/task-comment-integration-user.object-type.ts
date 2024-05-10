import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TaskCommentIntegrationUserObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly firstname!: string

    @Field(() => String)
    readonly lastname!: string
}
