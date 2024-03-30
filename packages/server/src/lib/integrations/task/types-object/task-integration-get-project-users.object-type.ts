import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class TaskIntegrationGetProjectUsersObject {
    @Field(() => String)
    readonly userId!: string

    @Field(() => String)
    readonly firstName!: string

    @Field(() => String)
    readonly lastName!: string
}

