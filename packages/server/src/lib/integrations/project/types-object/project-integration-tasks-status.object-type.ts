import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProjectIntegrationTasksStatusObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly code!: string

    @Field(() => String)
    readonly name!: string

    @Field(() => Number)
    readonly position!: number

    @Field(() => Boolean)
    readonly isDefault!: boolean

    @Field(() => String, { nullable: true })
    readonly description?: string | null
}
