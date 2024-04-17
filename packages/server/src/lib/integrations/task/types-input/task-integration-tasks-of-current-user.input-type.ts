import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TaskIntegrationTasksOfCurrentUserInput {
    @Field(() => Number, { nullable: true })
    curPage?: number | null

    @Field(() => Number, { nullable: true })
    perPage?: number | null
}
