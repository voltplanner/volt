import { Injectable } from "@nestjs/common";

import { TaskUserService } from "../../../modules/task/services/task-user.service";
import { TaskService } from "../../../modules/task/services/task.service";
import { PrismaServiceWithExtentionsType, PrismaTransactionClientType } from "../../../shared/prisma";
import { getObjectKeys, getObjectValues } from "../../../shared/utils";
import { DEFAULT_TASK_RELATIONS } from "../constants/task-integration-default-task-relations";
import { DEFAULT_TASK_STATUSES } from "../constants/task-integration-default-task-statuses";
import { DEFAULT_TASK_TAGS } from "../constants/task-integration-default-task-tags";
import { DEFAULT_USER_ACTIONS } from "../constants/task-integration-default-user-actions.constant";
import { DEFAULT_USER_PERMISSIONS } from "../constants/task-integration-default-user-permissions.constant";
import { DEFAULT_USER_ROLES, DEFAULT_USER_ROLE_CODES } from "../constants/task-integration-default-user-roles.constant";

@Injectable()
export class TaskIntegrationInitService {
    constructor(
        private readonly _taskUserService: TaskUserService,
        private readonly _taskService: TaskService,
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    async initProjectRolesAndPermissions(dto: {
        projectId: string
    }, client?: PrismaTransactionClientType): Promise<void> {
        const { projectId } = dto

        for (const roleCode of getObjectValues(DEFAULT_USER_ROLE_CODES)) {
            const role = DEFAULT_USER_ROLES[roleCode]

            await this._taskUserService.roleUpsert({
                code: roleCode,
                name: role.name,
                projectId,
                description: role.description,
            }, client)

            for (const actionCode of getObjectKeys(DEFAULT_USER_ACTIONS)) {
                const action = DEFAULT_USER_ACTIONS[actionCode]

                await this._taskUserService.actionUpsert({
                    roleCode,
                    actionCode,
                    actionName: action.name,
                    actionDescription: action.description,
                    isAllowed: DEFAULT_USER_PERMISSIONS[roleCode][actionCode],
                }, client)
            }
        }
    }

    async initTaskStatuses(dto: {
        projectId: string
    }, client?: PrismaTransactionClientType) {
        const { projectId } = dto

        for (const item of DEFAULT_TASK_STATUSES.map(i => ({ ...i, projectId }))) {
            await this._taskService.statusUpsert(item, client)
        }
    }

    async initTaskTags(dto: {
        projectId: string
    }, client?: PrismaTransactionClientType) {
        const { projectId } = dto

        for (const item of DEFAULT_TASK_TAGS.map(i => ({ ...i, projectId }))) {
            await this._taskService.tagUpsert(item, client)
        }
    }

    async initTaskRelations(dto: {
        projectId: string
    }, client?: PrismaTransactionClientType) {
        const { projectId } = dto

        for (const item of DEFAULT_TASK_RELATIONS.map(i => ({ ...i, projectId }))) {
            await this._taskService.relationUpsert(item, client)
        }
    }
}
