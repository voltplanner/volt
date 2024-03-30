import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TaskIntegrationGetTaskTagsInput {
    @Field(() => String)
    readonly projectId!: string
}
