import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TaskEffortIntegrationUserObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly firstname!: string

    @Field(() => String)
    readonly lastname!: string
}
