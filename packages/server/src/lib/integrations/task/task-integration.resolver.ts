import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "@shared/decorators";
import { CurrentUserPayload, PaginatedInput, PaginatedResponse } from "@shared/interfaces";

import { AuthUserService } from "../../modules/auth/services/auth-user.service";
import { TaskService } from "../../modules/task/services/task.service";
import { PaginatedInputType, PaginatedResponseType } from "../../shared/graphql/shared.graphql";
import { PrismaServiceWithExtentionsType } from "../../shared/prisma";
import { TaskIntegrationTaskCreateInput } from "./types-input/task-integration-task-create.input-type";
import { TaskIntegrationTaskUpdateInput } from "./types-input/task-integration-task-update.input-type";
import { TaskIntegrationTaskObject } from "./types-object/task-integration-task.object-type";

@Resolver()
export class TaskIntegrationResolver {
    constructor (
        private readonly _authUserService: AuthUserService,
        private readonly _taskService: TaskService,
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    @Mutation(() => String)
    async taskCreate(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskIntegrationTaskCreateInput
    ): Promise<string> {
        const {
            projectId,
            name,
            description,
            statusId,
            assignedToId,
            estimatedDuration,
            tagsIds,
            parentId,
        } = input

        const estimatedDateEnd = input.estimatedDateEnd
            ? new Date(input.estimatedDateEnd)
            : (input.estimatedDateEnd === null ? null : undefined)

        const estimatedDateStart = input.estimatedDateStart
            ? new Date(input.estimatedDateStart)
            : (input.estimatedDateStart === null ? null : undefined)

        return await this._prismaService.$transaction(async (tx) => {
            const taskId = await this._taskService.taskCreate({
                createdById: userId,
                name,
                projectId,
                statusId,
                assignedToId,
                description,
                estimatedDateEnd,
                estimatedDateStart,
                estimatedDuration,
                parentId,
                tagsIds,
            }, tx)

            return taskId
        })
    }

    @Mutation(() => String)
    async taskUpdate(
        @Args('input') input: TaskIntegrationTaskUpdateInput
    ) {
        return await this._taskService.update(input)
    }

    @Query(() => PaginatedResponseType(TaskIntegrationTaskObject))
    async tasks(
        @Args('input', { type: () => PaginatedInputType(), nullable: true }) input?: PaginatedInput | null
    ): Promise<PaginatedResponse<TaskIntegrationTaskObject>> {
        const { curPage, perPage } = input || {}

        const { data, meta } = await this._taskService.taskFindMany({
            curPage,
            perPage,
        })

        const tasks: TaskIntegrationTaskObject[] = []

        for (const task of data) {
            const userAssigned = await this._authUserService.getUser(task.assignedToId)
            const userCreated = await this._authUserService.getUser(task.createdById)

            tasks.push({
                ...task,
                status: task.status.name,
                createdBy: { id: userCreated.id, lastname: userCreated.lastname, firstname: userCreated.firstname },
                assignedTo: { id: userAssigned.id, lastname: userAssigned.lastname, firstname: userAssigned.firstname },
                createdAt: Number(task.createdAt),
                estimatedDateEnd: Number(task.estimatedDateEnd),
                estimatedDateStart: Number(task.estimatedDateStart),
                estimatedDuration: Number(task.estimatedDuration.toString()),
            })
        }

        return { meta, data: tasks }
    }

    @Query(() => PaginatedResponseType(TaskIntegrationTaskObject))
    async tasksOfCurrentUser(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input', { type: () => PaginatedInputType(), nullable: true }) input?: PaginatedInput | null
    ): Promise<PaginatedResponse<TaskIntegrationTaskObject>> {
        const { curPage, perPage } = input || {}

        const { data, meta } = await this._taskService.taskFindMany({
            assignedToId: userId,
            curPage,
            perPage,
        })

        const tasks: TaskIntegrationTaskObject[] = []

        for (const task of data) {
            const userAssigned = await this._authUserService.getUser(task.assignedToId)
            const userCreated = await this._authUserService.getUser(task.createdById)

            tasks.push({
                ...task,
                status: task.status.name,
                createdBy: { id: userCreated.id, lastname: userCreated.lastname, firstname: userCreated.firstname },
                assignedTo: { id: userAssigned.id, lastname: userAssigned.lastname, firstname: userAssigned.firstname },
                createdAt: Number(task.createdAt),
                estimatedDateEnd: Number(task.estimatedDateEnd),
                estimatedDateStart: Number(task.estimatedDateStart),
                estimatedDuration: Number(task.estimatedDuration.toString()),
            })
        }

        return { meta, data: tasks }
    }
}
