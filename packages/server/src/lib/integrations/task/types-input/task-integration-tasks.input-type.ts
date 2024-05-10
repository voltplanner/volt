import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TaskIntegrationTasksFilterByInput {
    @Field(() => [String], { nullable: true })
    name?: string[] | null
    @Field(() => [Number], { nullable: true })
    number?: number[] | null
    @Field(() => [String], { nullable: true })
    statusId?: string[] | null
    @Field(() => [String], { nullable: true })
    parentId?: string[] | null
    @Field(() => [String], { nullable: true })
    projectId?: string[] | null
    @Field(() => [String], { nullable: true })
    createdById?: string[] | null
    @Field(() => [String], { nullable: true })
    assignedToId?: string[] | null
    @Field(() => [String], { nullable: true })
    fulltext?: string[] | null
    @Field(() => [String], { nullable: true })
    tagId?: string[]

    @Field(() => Number, { nullable: true })
    createdAtFrom?: number | null
    @Field(() => Number, { nullable: true })
    createdAtTo?: number | null
}

@InputType()
export class TaskIntegrationTasksInput {
    @Field(() => Number, { nullable: true })
    curPage?: number | null

    @Field(() => Number, { nullable: true })
    perPage?: number | null

    @Field(() => TaskIntegrationTasksFilterByInput, { nullable: true })
    filterBy?: TaskIntegrationTasksFilterByInput | null
}
