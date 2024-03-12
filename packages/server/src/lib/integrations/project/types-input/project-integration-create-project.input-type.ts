import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProjectIntegrationProjectCreateInput {
    @Field(() => String)
    readonly name!: string

    @Field(() => String)
    readonly description!: string
}
