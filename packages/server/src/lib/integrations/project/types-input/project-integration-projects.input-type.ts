import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProjectIntegrationProjectsInput {
    @Field(() => [String], { nullable: true })
    fulltext?: string[] | null

    @Field(() => Number, { nullable: true })
    curPage?: number | null

    @Field(() => Number, { nullable: true })
    perPage?: number | null
}
