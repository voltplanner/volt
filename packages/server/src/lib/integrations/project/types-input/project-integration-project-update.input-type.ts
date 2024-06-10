import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProjectIntegrationProjectUpdateInput {
    @Field(() => String)
    readonly id: string

    @Field(() => Number)
    readonly version: number

    @Field(() => String, { nullable: true })
    readonly name?: string | null

    @Field(() => String, { nullable: true })
    readonly key?: string | null

    @Field(() => String, { nullable: true })
    readonly description?: string | null

    @Field(() => Number, { nullable: true })
    readonly budget?: number | null

    @Field(() => Number, { nullable: true })
    readonly deadline?: number | null
}
