import { Inject, Injectable } from '@nestjs/common'

import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
    PrismaTransactionClientType,
} from '../../../shared/prisma'
import { TASK_CONFIG, TaskConfig } from '../configs/task-module.config'
import { TaskProjectUpdateConflictError } from '../errors/task-project-update-conflict.error'

@Injectable()
export class TaskProjectService {
    constructor(
        @Inject(PrismaService)
        private readonly prisma: PrismaServiceWithExtentionsType,
        @Inject(TASK_CONFIG)
        private readonly config: TaskConfig,
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

        const client = prisma || this.prisma

        const projectId = await client.taskProject.extCreate(
            {
                name,
                budget,
                deadline,
                description,
            },
            client,
        )

        await this.initializeTasksTags({ projectId }, client)
        await this.initializeUsersRoles({ projectId }, client)
        await this.initializeTasksStatuses({ projectId }, client)
        await this.initializeTasksRelations({ projectId }, client)

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
        const client = prisma || this.prisma

        try {
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
        } catch (e) {
            const conflictingProps = await this._findConflictingProps(dto)

            throw new TaskProjectUpdateConflictError({ id: dto.id, conflictingProps })
        }
    }

    async getById(dto?: {
        id: string
    }, prisma?: PrismaTransactionClientType) {
        const client = prisma || this.prisma

        return await client.taskProject.extGetById(dto, client)
    }

    async findMany(dto?: {
        curPage?: number
        perPage?: number

        filterByName?: string | string[]
        filterByUserId?: string | string[]
        filterByFulltext?: string | string[]
        filterByCreatedAt?: {
            from?: Date
            to?: Date
        }

        orderBy?: {
            field: 'name' | 'status' | 'createdAt'
            order: OrderEnum
        }
    }, prisma?: PrismaTransactionClientType) {
        const client = prisma || this.prisma

        return await client.taskProject.extFindMany(dto, client)
    }

    async addUsers(
        dto: {
            readonly projectId: string
            readonly userIds: string[]
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId, userIds } = dto

        const client = prisma || this.prisma

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

    async upsertTasksStatuses(
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

        const client = prisma || this.prisma

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

    async findAllTasksStatuses(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        const client = prisma || this.prisma

        return await client.taskStatus.extFindMany(
            {
                projectId,
            },
            client,
        )
    }

    async initializeTasksStatuses(
        dto: {
            projectId: string
        },
        client?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        for (const item of this.config.statuses) {
            await this.upsertTasksStatuses({ ...item, projectId }, client)
        }
    }

    async upsertTasksTags(
        dto: {
            readonly code: string
            readonly name: string
            readonly description: string
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { code, name, description, projectId } = dto

        const client = prisma || this.prisma

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

    async findAllTasksTags(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        const client = prisma || this.prisma

        return await client.taskTag.extFindMany(
            {
                projectId,
            },
            client,
        )
    }

    async initializeTasksTags(
        dto: {
            projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto
        const client = prisma || this.prisma

        for (const item of this.config.tags) {
            await this.upsertTasksTags({ ...item, projectId }, client)
        }
    }

    async upsertTasksRelations(
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

        const client = prisma || this.prisma

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

    async findAllTasksRelations(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        const client = prisma || this.prisma

        return await client.taskRelation.extFindMany(
            {
                projectId,
            },
            client,
        )
    }

    async initializeTasksRelations(
        dto: {
            projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto
        const client = prisma || this.prisma

        for (const item of this.config.relations) {
            await this.upsertTasksRelations({ ...item, projectId }, client)
        }
    }

    async upsertUsersRoles(
        dto: {
            readonly code: string
            readonly name: string
            readonly projectId: string
            readonly description: string
        },
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        const { code, name, projectId, description } = dto

        const client = prisma || this.prisma

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

    async findAllUsersRoles(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { projectId } = dto

        const client = prisma || this.prisma

        return await client.taskUserRole.extFindMany({ projectId })
    }

    async initializeUsersRoles(
        dto: {
            projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ): Promise<void> {
        const { projectId } = dto
        const client = prisma || this.prisma

        for (const role of this.config.roles) {
            await this.upsertUsersRoles(
                {
                    projectId,
                    code: role.code,
                    name: role.name,
                    description: role.description,
                },
                client,
            )
        }
    }

    private async _findConflictingProps(dto: {
        readonly id: string
        readonly name?: string
        readonly budget?: number | null
        readonly deadline?: number | null
        readonly description?: string | null
    }, prisma?: PrismaTransactionClientType,
    ): Promise<{
        name?: { old?: string; new: string }
        description?: { old?: string; new: string | null }
        deadline?: { old?: number; new: number | null }
        budget?: { old?: number; new: number | null }
    }> {
        const client = prisma || this.prisma

        const project = await client.taskProject.extGetById(
            { id: dto.id },
            client,
        )

        const conflictingProps: {
            name?: { old?: string; new: string }
            description?: { old?: string; new: string | null }
            deadline?: { old?: number; new: number | null }
            budget?: { old?: number; new: number | null }
        } = {}

        if (dto.name !== undefined && project.name !== dto.name) {
            conflictingProps.name = { old: project.name ?? undefined, new: dto.name }
        }

        if (dto.description !== undefined && project.description !== dto.description) {
            conflictingProps.description = { old: project.description ?? undefined, new: dto.description }
        }

        if (dto.deadline !== undefined && +project.deadline !== dto.deadline) {
            conflictingProps.deadline = { old: +project.deadline ?? undefined, new: dto.deadline }
        }

        if (dto.budget !== undefined && project.budget !== dto.budget) {
            conflictingProps.budget = { old: project.budget ?? undefined, new: dto.budget }
        }

        return conflictingProps
    }
}
