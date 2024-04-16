import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TaskIntegrationTaskUpdateInput {
    @Field(() => String)
    readonly id: string

    @Field(() => Number)
    readonly version: number

    @Field(() => String, { nullable: true })
    readonly name?: string | null

    @Field(() => String, { nullable: true })
    readonly description?: string | null

    @Field(() => Number, { nullable: true })
    readonly estimatedDateEnd?: number | null

    @Field(() => Number, { nullable: true })
    readonly estimatedDateStart?: number | null

    @Field(() => Number, { nullable: true })
    readonly estimatedDuration?: number | null

    @Field(() => String, { nullable: true })
    readonly parentId?: string | null

    @Field(() => String, { nullable: true })
    readonly statusId?: string | null

    @Field(() => String, { nullable: true })
    readonly assignedToId?: string | null

    @Field(() => [String], { nullable: true })
    readonly taskTagIds?: string[] | null
}
