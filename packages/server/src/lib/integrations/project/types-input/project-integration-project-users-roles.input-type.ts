import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProjectIntegrationProjectUsersRolesInput {
    @Field(() => String)
    readonly projectId!: string
}
