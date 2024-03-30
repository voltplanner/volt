import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TaskIntegrationCreateProjectMembersInput {
    @Field(() => String)
    readonly userId!: string

    @Field(() => String)
    readonly roleCode!: string
}

@InputType()
export class TaskIntegrationCreateProjectInput {
    @Field(() => String)
    readonly name!: string

    @Field(() => Number, {
        description: 'Budget of the project in hours',
    })
    readonly budget!: number

    @Field(() => Number, {
        description: 'Deadline of the project in timestampMs',
    })
    readonly deadline!: number

    @Field(() => String)
    readonly description!: string

    @Field(() => [TaskIntegrationCreateProjectMembersInput], {
        nullable: true,
    })
    readonly members?: TaskIntegrationCreateProjectMembersInput[] | null
}
