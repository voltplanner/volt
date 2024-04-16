import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProjectIntegrationTasksRelationObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly code!: string

    @Field(() => String)
    readonly nameMain!: string

    @Field(() => String)
    readonly nameForeign!: string

    @Field(() => Number)
    readonly position!: number

    @Field(() => String, { nullable: true })
    readonly description?: string | null
}
