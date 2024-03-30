import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "@shared/decorators";
import { CurrentUserPayload, OrderEnum, PaginatedResponse } from "@shared/interfaces";

import { AuthUserService } from "../../modules/auth/services/auth-user.service";
import { TaskProjectService } from "../../modules/task/services/task-project.service";
import { TaskUserService } from "../../modules/task/services/task-user.service";
import { TaskService } from "../../modules/task/services/task.service";
import { PaginatedResponseType } from "../../shared/graphql/shared.graphql";
import { AuthUserStatusEnum, PrismaServiceWithExtentionsType } from "../../shared/prisma";
import { DEFAULT_USER_ROLES, DEFAULT_USER_ROLE_CODES } from "./constants/task-integration-default-user-roles.constant";
import { TaskIntegrationInitService } from "./services/task-integration-init.service";
import { TaskIntegrationCreateProjectInput, TaskIntegrationCreateProjectMembersInput } from "./types-input/task-integration-create-project.input-type";
import { TaskIntegrationCreateTaskInput } from "./types-input/task-integration-create-task.input-type";
import { TaskIntegrationGetProjectUsersInput } from "./types-input/task-integration-get-project-users.input-type";
import { TaskIntegrationGetTaskStatusesInput } from "./types-input/task-integration-get-task-statuses.input-type";
import { TaskIntegrationGetTaskTagsInput } from "./types-input/task-integration-get-task-tags.input-type";
import { TaskIntegrationGetProjectUsersObject } from "./types-object/task-integration-get-project-users.object-type";
import { TaskIntegrationGetDefaultRolesObject } from "./types-object/task-integration-get-roles-default.object-type";
import { TaskIntegrationGetTaskStatusesObject } from "./types-object/task-integration-get-task-statuses.object-type";
import { TaskIntegrationGetTaskTagsObject } from "./types-object/task-integration-get-task-tags.object-type";

@Resolver()
export class TaskIntegrationResolver {
    constructor (
        private readonly _authUserService: AuthUserService,
        private readonly _taskService: TaskService,
        private readonly _taskUserService: TaskUserService,
        private readonly _taskProjectService: TaskProjectService,
        private readonly _prismaService: PrismaServiceWithExtentionsType,
        private readonly _taskIntegrationInitService: TaskIntegrationInitService,
    ) {}

    @Mutation(() => String)
    async createProject(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskIntegrationCreateProjectInput
    ): Promise<string> {
        const { name, budget, deadline, description } = input

        const members: TaskIntegrationCreateProjectMembersInput[] = input.members ?? []
        const memberIds: string[] = []

        return await this._prismaService.$transaction(async (tx) => {
            for (const member of members) {
                const internalUserId = await this._taskUserService.userUpsert(member, tx)

                memberIds.push(internalUserId)
            }

            const projectId = await this._taskProjectService.projectCreate({
                name,
                budget,
                description,
                deadline: new Date(deadline),
            }, tx)

            await this._taskIntegrationInitService.initProjectRolesAndPermissions({
                projectId,
            }, tx)

            await this._taskIntegrationInitService.initTaskRelations({
                projectId,
            }, tx)

            await this._taskIntegrationInitService.initTaskStatuses({
                projectId,
            }, tx)

            await this._taskIntegrationInitService.initTaskTags({
                projectId,
            }, tx)

            await this._taskProjectService.projectAddUsers({
                projectId,
                userIds: memberIds,
            }, tx)

            return projectId
        })
    }

    @Mutation(() => String)
    async createTask(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskIntegrationCreateTaskInput
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

    @Query(() => [TaskIntegrationGetDefaultRolesObject])
    async getDefaultRoles(): Promise<TaskIntegrationGetDefaultRolesObject[]> {
        const defaultRoles: TaskIntegrationGetDefaultRolesObject[] = []

        for (const code of Object.values(DEFAULT_USER_ROLE_CODES)) {
            defaultRoles.push({
                code,
                name: DEFAULT_USER_ROLES[code].name,
                description: DEFAULT_USER_ROLES[code].description,
            })
        }

        return defaultRoles
    }

    @Query(() => PaginatedResponseType(TaskIntegrationGetProjectUsersObject))
    async getProjectUsers(
        @Args('input') input: TaskIntegrationGetProjectUsersInput
    ): Promise<PaginatedResponse<TaskIntegrationGetProjectUsersObject>> {
        const { projectId, filterByName, orderBy, curPage, perPage } = input

        const projectUsersIds = await this._taskUserService.userFindAll({
            projectId,
        })

        const users = await this._authUserService.getUsers({
            curPage,
            perPage,
            filter: {
                ids: projectUsersIds,
                firstname: filterByName,
                lastname: filterByName,
                status: AuthUserStatusEnum.ACTIVE,
            },
            orderBy: orderBy || {
                field: 'lastname',
                order: OrderEnum.ASC,
            },
        })

        return {
            data: users.data.map((i) => ({
                userId: i.id,
                lastName: i.lastname,
                firstName: i.firstname,
            })),
            meta: users.meta,
        }
    }

    @Query(() => [TaskIntegrationGetTaskStatusesObject])
    async getTaskStatuses(
        @Args('input') input: TaskIntegrationGetTaskStatusesInput
    ): Promise<TaskIntegrationGetTaskStatusesObject[]> {
        const { projectId } = input

        return await this._taskService.statusFindAll({
            projectId,
        })
    }

    @Query(() => [TaskIntegrationGetTaskTagsObject])
    async getTaskTags(
        @Args('input') input: TaskIntegrationGetTaskTagsInput
    ): Promise<TaskIntegrationGetTaskTagsObject[]> {
        const { projectId } = input

        return await this._taskService.tagFindAll({
            projectId,
        })
    }
}
