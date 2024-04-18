import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProjectIntegrationCreateProjectInput {
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

    @Field(() => [ProjectIntegrationCreateProjectMemberInput], {
        nullable: true,
    })
    readonly members?: ProjectIntegrationCreateProjectMemberInput[] | null
}

@InputType()
export class ProjectIntegrationCreateProjectMemberInput {
    @Field(() => String)
    readonly userId!: string

    @Field(() => String)
    readonly roleCode!: string
}
