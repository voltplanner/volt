import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProjectIntegrationTasksTagObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly code!: string

    @Field(() => String)
    readonly name!: string

    @Field(() => Number)
    readonly position!: number

    @Field(() => String, { nullable: true })
    readonly description?: string | null
}
