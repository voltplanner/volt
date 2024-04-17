import { Inject, Injectable } from '@nestjs/common'

import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
    PrismaTransactionClientType,
} from '../../../shared/prisma'
import { getObjectValues } from '../../../shared/utils/object.util'
import { TASK_DEFAULT_TASKS_RELATIONS } from '../constants/task-default-tasks-relations'
import { TASK_DEFAULT_TASKS_STATUSES } from '../constants/task-default-tasks-statuses'
import { TASK_DEFAULT_TASKS_TAGS } from '../constants/task-default-tasks-tags'
import {
    TASK_DEFAULT_USER_ROLE_CODES,
    TASK_DEFAULT_USERS_ROLES,
} from '../constants/task-default-users-roles.constant'

@Injectable()
export class TaskProjectService {
    constructor(
        @Inject(PrismaService)
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    async create(
        dto: {
            readonly name: string
            readonly budget?: number
            readonly deadline?: Date
            readonly description?: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { name, budget, deadline, description } = dto

        const client = prisma || this._prismaService

        const projectId = await client.taskProject.extCreate(
            {
                name,
                budget,
                deadline,
                description,
            },
            client,
        )

        await this.tasksTagsInitialize({ projectId }, client)
        await this.usersRolesInitialize({ projectId }, client)
        await this.tasksStatusesInitialize({ projectId }, client)
        await this.tasksRelationsInitialize({ projectId }, client)

        return projectId
    }

    async update(
        dto: {
            readonly id: string
            readonly version: number
            readonly name?: string
            readonly budget?: number | null
            readonly deadline?: number | null
            readonly description?: string | null
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this._prismaService

        return await client.taskProject.extUpdate(
            {
                ...dto,
                deadline:
                    typeof dto.deadline === 'number'
                        ? new Date(dto.deadline)
                        : dto.deadline,
            },
            client,
        )
    }

    async findMany(dto?: {
        curPage?: number
        perPage?: number

        filterByName?: string
        filterByUserId?: string
        filterByCreatedAt?: {
            from?: Date
            to?: Date
        }

        orderBy?: {
            field: 'name' | 'status' | 'createdAt'
            order: OrderEnum
        }
    }) {
        return await this._prismaService.taskProject.extFindMany(dto)
    }

    async usersAdd(
        dto: {
            readonly projectId: string
            readonly userIds: string[]
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId, userIds } = dto

        const client = prisma || this._prismaService

        if (userIds.length) {
            await client.taskProject.extConnectUsers(
                {
                    projectId,
                    userIds,
                },
                client,
            )
        }
    }

    async tasksStatusesUpsert(
        dto: {
            readonly code: string
            readonly name: string
            readonly description: string
            readonly projectId: string
            readonly isDefault?: boolean
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { code, name, description, projectId, isDefault } = dto

        const client = prisma || this._prismaService

        const id = await client.taskStatus.extUpsert(
            {
                code,
                name,
                description,
                projectId,
                isDefault,
            },
            client,
        )

        return id
    }

    async tasksStatusesFindAll(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskStatus.extFindMany(
            {
                projectId,
            },
            client,
        )
    }

    async tasksStatusesInitialize(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        for (const item of TASK_DEFAULT_TASKS_STATUSES) {
            await this.tasksStatusesUpsert({ ...item, projectId }, client)
        }
    }

    async tasksTagsUpsert(
        dto: {
            readonly code: string
            readonly name: string
            readonly description: string
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { code, name, description, projectId } = dto

        const client = prisma || this._prismaService

        const id = await client.taskTag.extUpsert(
            {
                code,
                name,
                description,
                projectId,
            },
            client,
        )

        return id
    }

    async tasksTagsFindAll(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskTag.extFindMany(
            {
                projectId,
            },
            client,
        )
    }

    async tasksTagsInitialize(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        for (const item of TASK_DEFAULT_TASKS_TAGS) {
            await this.tasksTagsUpsert({ ...item, projectId }, client)
        }
    }

    async tasksRelationsUpsert(
        dto: {
            readonly code: string
            readonly nameMain: string
            readonly nameForeign: string
            readonly description: string
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { code, nameMain, nameForeign, description, projectId } = dto

        const client = prisma || this._prismaService

        const id = await client.taskRelation.extUpsert(
            {
                code,
                nameMain,
                nameForeign,
                description,
                projectId,
            },
            client,
        )

        return id
    }

    async tasksRelationsFindAll(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskRelation.extFindMany(
            {
                projectId,
            },
            client,
        )
    }

    async tasksRelationsInitialize(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        for (const item of TASK_DEFAULT_TASKS_RELATIONS) {
            await this.tasksRelationsUpsert({ ...item, projectId }, client)
        }
    }

    async usersRolesUpsert(
        dto: {
            readonly code: string
            readonly name: string
            readonly projectId: string
            readonly description: string
        },
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        const { code, name, projectId, description } = dto

        const client = prisma || this._prismaService

        const roleId = await client.taskUserRole.extUpsert(
            {
                code,
                name,
                projectId,
                description,
            },
            client,
        )

        return roleId
    }

    async usersRolesFindAll(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskUserRole.extFindMany({ projectId })
    }

    async usersRolesInitialize(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ): Promise<void> {
        const { projectId } = dto

        for (const roleCode of getObjectValues(TASK_DEFAULT_USER_ROLE_CODES)) {
            const role = TASK_DEFAULT_USERS_ROLES[roleCode]

            await this.usersRolesUpsert(
                {
                    projectId,
                    code: roleCode,
                    name: role.name,
                    description: role.description,
                },
                client,
            )
        }
    }
}
