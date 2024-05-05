import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TaskIntegrationTaskTagObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly code!: string

    @Field(() => String)
    readonly name!: string
}
