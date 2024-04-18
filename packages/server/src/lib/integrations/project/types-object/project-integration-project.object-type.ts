import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProjectIntegrationProjectObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly name!: string

    @Field(() => String, { nullable: true })
    readonly description?: string | null

    @Field(() => Number, { nullable: true })
    readonly deadline?: number | null

    @Field(() => Number, { nullable: true })
    readonly budget?: number | null

    @Field(() => Number)
    readonly version: number

    @Field(() => Number)
    readonly createdAt: number
}
