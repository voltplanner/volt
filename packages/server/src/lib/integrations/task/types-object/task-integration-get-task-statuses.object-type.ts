import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TaskIntegrationGetTaskStatusesObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly code!: string

    @Field(() => String)
    readonly name!: string

    @Field(() => String, {
        nullable: true,
    })
    readonly description?: string | null
}
