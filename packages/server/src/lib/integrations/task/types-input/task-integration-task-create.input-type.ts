import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskIntegrationCreateTaskInput {
    @Field(() => String)
    readonly projectId!: string

    @Field(() => String)
    readonly name!: string

    @Field(() => String)
    readonly statusId!: string

    @Field(() => String, {
        nullable: true,
    })
    readonly description?: string | null

    @Field(() => Number, {
        nullable: true,
    })
    readonly estimatedDateStart?: number | null

    @Field(() => Number, {
        nullable: true,
    })
    readonly estimatedDateEnd?: number | null

    @Field(() => Number, {
        nullable: true,
    })
    readonly estimatedDuration?: number | null

    @Field(() => String, {
        nullable: true,
    })
    readonly assignedToId?: string | null

    @Field(() => String, {
        nullable: true,
    })
    readonly parentId?: string | null

    @Field(() => [String], {
        nullable: true,
    })
    readonly tagIds?: string[] | null
}
