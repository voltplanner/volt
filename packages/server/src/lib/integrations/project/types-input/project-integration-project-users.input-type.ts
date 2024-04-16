import { Field, InputType } from "@nestjs/graphql";

import { OrderByInput, PaginatedMetaInput } from "../../../shared/graphql/shared.graphql";

@InputType()
export class ProjectIntegrationProjectUsersInput extends PaginatedMetaInput {
    @Field(() => String)
    readonly projectId!: string

    @Field(() => String, {
        nullable: true,
    })
    readonly filterByName?: string | null

    @Field(() => OrderByInput, {
        nullable: true,
    })
    readonly orderBy?: OrderByInput | null
}
