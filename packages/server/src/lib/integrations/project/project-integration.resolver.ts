import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "@shared/decorators";
import { CurrentUserPayload } from "@shared/interfaces";

import { TaskProjectService } from "../../modules/task/services/task-project.service";
import { ProjectIntegrationProjectCreateInput } from "./types-input/project-integration-create-project.input-type";
import { ACLGuard } from "../../shared/guards/acl.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class ProjectIntegrationResolver {
    constructor (
        private readonly _taskProjectService: TaskProjectService,
    ) {}

    @UseGuards(ACLGuard)
    @Mutation(() => String)
    async projectCreate(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: ProjectIntegrationProjectCreateInput
    ): Promise<string> {
        const { name, description } = input

        return await this._taskProjectService.createProject({
            name,
            description,
            externalUserId: userId,
        })
    }
}
