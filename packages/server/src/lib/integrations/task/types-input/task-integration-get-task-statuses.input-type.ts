import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TaskIntegrationGetTaskStatusesInput {
    @Field(() => String)
    readonly projectId!: string
}
