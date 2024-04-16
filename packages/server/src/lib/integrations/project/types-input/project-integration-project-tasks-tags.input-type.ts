import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProjectIntegrationProjectTasksTagsInput {
    @Field(() => String)
    readonly projectId!: string
}
