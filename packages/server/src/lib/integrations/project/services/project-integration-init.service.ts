import { Injectable } from '@nestjs/common'

import { TaskProjectService } from '../../../modules/task/services/task-project.service'
import { PrismaTransactionClientType } from '../../../shared/prisma'
import { getObjectValues } from '../../../shared/utils'
import { DEFAULT_TASKS_RELATIONS } from '../constants/project-integration-default-tasks-relations'
import { DEFAULT_TASKS_STATUSES } from '../constants/project-integration-default-tasks-statuses'
import { DEFAULT_TASKS_TAGS } from '../constants/project-integration-default-tasks-tags'
import {
    DEFAULT_USER_ROLE_CODES,
    DEFAULT_USERS_ROLES,
} from '../constants/project-integration-default-users-roles.constant'

@Injectable()
export class ProjectIntegrationInitService {
    constructor(private readonly _taskProjectService: TaskProjectService) {}

    async initProjectRoles(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ): Promise<void> {
        const { projectId } = dto

        for (const roleCode of getObjectValues(DEFAULT_USER_ROLE_CODES)) {
            const role = DEFAULT_USERS_ROLES[roleCode]

            await this._taskProjectService.usersRolesUpsert(
                {
                    code: roleCode,
                    name: role.name,
                    projectId,
                    description: role.description,
                },
                client,
            )
        }
    }

    async initProjectTasksStatuses(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        for (const item of DEFAULT_TASKS_STATUSES.map((i) => ({
            ...i,
            projectId,
        }))) {
            await this._taskProjectService.tasksStatusesUpsert(item, client)
        }
    }

    async initProjectTasksTags(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        for (const item of DEFAULT_TASKS_TAGS.map((i) => ({
            ...i,
            projectId,
        }))) {
            await this._taskProjectService.tasksTagsUpsert(item, client)
        }
    }

    async initProjectTasksRelations(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        for (const item of DEFAULT_TASKS_RELATIONS.map((i) => ({
            ...i,
            projectId,
        }))) {
            await this._taskProjectService.tasksRelationsUpsert(item, client)
        }
    }
}
