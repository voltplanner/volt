import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProjectIntegrationProjectTasksStatusesInput {
    @Field(() => String)
    readonly projectId!: string
}
