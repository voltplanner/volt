import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProjectIntegrationProjectsFilterByInput {
    @Field(() => [String], { nullable: true })
    name?: string[] | null
    @Field(() => [String], { nullable: true })
    userId?: string[] | null
    @Field(() => [String], { nullable: true })
    fulltext?: string[] | null

    @Field(() => Number, { nullable: true })
    createdAtFrom?: number | null
    @Field(() => Number, { nullable: true })
    createdAtTo?: number | null
}

@InputType()
export class ProjectIntegrationProjectsInput {
    @Field(() => Number, { nullable: true })
    curPage?: number | null

    @Field(() => Number, { nullable: true })
    perPage?: number | null

    @Field(() => ProjectIntegrationProjectsFilterByInput, { nullable: true })
    filterBy?: ProjectIntegrationProjectsFilterByInput | null
}
