import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProjectIntegrationProjectInput {
    @Field(() => String)
    readonly id!: string
}
