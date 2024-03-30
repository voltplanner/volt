import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TaskIntegrationGetDefaultRolesObject {
    @Field(() => String)
    readonly code!: string

    @Field(() => String)
    readonly name!: string

    @Field(() => String, { nullable: true })
    readonly description?: string
}
