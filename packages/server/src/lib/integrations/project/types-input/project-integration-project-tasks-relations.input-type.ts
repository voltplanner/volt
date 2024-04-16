import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProjectIntegrationProjectTasksRelationsInput {
    @Field(() => String)
    readonly projectId!: string
}
