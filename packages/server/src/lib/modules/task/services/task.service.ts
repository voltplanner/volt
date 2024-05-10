import { Inject, Injectable } from '@nestjs/common'

import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
    PrismaTransactionClientType,
} from '../../../shared/prisma'
import { TaskUpdateConflictError } from '../errors/task-update-conflict.error'

@Injectable()
export class TaskService {
    constructor(
        @Inject(PrismaService)
        private readonly prisma: PrismaServiceWithExtentionsType,
    ) {}

    async create(
        dto: {
            readonly name: string
            readonly description?: string
            readonly estimatedDateEnd?: Date
            readonly estimatedDateStart?: Date
            readonly estimatedDuration?: number

            readonly statusId: string
            readonly projectId: string
            readonly createdById: string

            readonly parentId?: string
            readonly assignedToId?: string
            readonly tagsIds?: string[]
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        const id = await client.task.extCreate(dto, client)

        return id
    }

    async update(
        dto: {
            id: string
            version: number

            name?: string
            description?: string | null
            estimatedDateEnd?: number | null
            estimatedDateStart?: number | null
            estimatedDuration?: number | null

            parentId?: string
            statusId?: string
            assignedToId?: string | null

            tagIds?: string[]
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        try {
            const { tagIds } = dto

            await client.task.extUpdate(
                {
                    ...dto,
                    estimatedDateEnd:
                        typeof dto.estimatedDateEnd === 'number'
                            ? new Date(dto.estimatedDateEnd)
                            : dto.estimatedDateEnd,
                    estimatedDateStart:
                        typeof dto.estimatedDateStart === 'number'
                            ? new Date(dto.estimatedDateStart)
                            : dto.estimatedDateStart,
                },
                client,
            )

            if (tagIds?.length) {
                await client.task.extSetTags(
                    {
                        taskId: dto.id,
                        tagIds: tagIds,
                    },
                    client,
                )
            }

            return dto.id
        } catch (e) {
            const conflictingProps = await this._findConflictingProps(dto)

            throw new TaskUpdateConflictError({ id: dto.id, conflictingProps })
        }
    }

    async findMany(dto?: {
        curPage?: number
        perPage?: number

        filterByName?: string | string[]
        filterByTagId?: string | string[]
        filterByNumber?: number | number[]
        filterByStatusId?: string | string[]
        filterByParentId?: string | string[]
        filterByFulltext?: string | string[]
        filterByProjectId?: string | string[]
        filterByCreatedById?: string | string[]
        filterByAssignedToId?: string | string[]
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

        return await client.task.extFindMany(dto, client)
    }

    async getById(dto: {
        id: string
    }, prisma?: PrismaTransactionClientType) {
        const client = prisma || this.prisma

        return await client.task.extGetById(dto, client)
    }

    async upsertCustomFieldValueType(
        dto: {
            readonly code: string
            readonly name: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { code, name } = dto

        const client = prisma || this.prisma

        const id = await client.taskCustomFieldValueType.extUpsert(
            {
                code,
                name,
            },
            client,
        )

        return id
    }

    private async _findConflictingProps(dto: {
        readonly id: string
        readonly name?: string
        readonly description?: string | null
        readonly estimatedDateEnd?: number | null
        readonly estimatedDateStart?: number | null
        readonly estimatedDuration?: number | null

        readonly statusId?: string
        
        readonly assignedToId?: string | null

        readonly tagIds?: string[]
    }, prisma?: PrismaTransactionClientType,
    ): Promise<{
        name?: { old?: string; new: string | null }
        description?: { old?: string; new: string | null }
        deadline?: { old?: number; new: number | null }
        budget?: { old?: number; new: number | null }
    }> {
        const client = prisma || this.prisma

        const task = await client.task.extGetById(
            { id: dto.id },
            client,
        )

        const conflictingProps: {
            name?: { old?: string; new: string }
            statusId?: { old?: string; new: string }
            description?: { old?: string; new: string | null }
            assignedToId?: { old?: string; new: string | null }
            estimatedDuration?: { old?: number; new: number | null }
            estimatedDateEnd?: { old?: number; new: number | null }
            estimatedDateStart?: { old?: number; new: number | null }
            tagIds?: { old?: string[]; new: string[] }
        } = {}

        if (dto.tagIds !== undefined) {
            const newTaskTags = [...dto.tagIds].sort().join()
            const oldTaskTags = [...task.tags.map(i => i.id)].sort().join()

            if (newTaskTags !== oldTaskTags) {
                conflictingProps.tagIds = { old: task.tags.map(i => i.id) ?? undefined, new: dto.tagIds }
            }
        }

        if (dto.name !== undefined && task.name !== dto.name) {
            conflictingProps.name = { old: task.name ?? undefined, new: dto.name }
        }

        if (dto.statusId !== undefined && task.statusId !== dto.statusId) {
            conflictingProps.statusId = { old: task.statusId ?? undefined, new: dto.statusId }
        }

        if (dto.description !== undefined && task.description !== dto.description) {
            conflictingProps.description = { old: task.description ?? undefined, new: dto.description }
        }

        if (dto.estimatedDateEnd !== undefined && +task.estimatedDateEnd !== dto.estimatedDateEnd) {
            conflictingProps.estimatedDateEnd = { old: +task.estimatedDateEnd ?? undefined, new: dto.estimatedDateEnd }
        }

        if (dto.estimatedDateStart !== undefined && +task.estimatedDateStart !== dto.estimatedDateStart) {
            conflictingProps.estimatedDateStart = {
                old: +task.estimatedDateStart ?? undefined,
                new: dto.estimatedDateStart,
            }
        }

        if (dto.assignedToId !== undefined && task.assignedToId !== dto.assignedToId) {
            conflictingProps.assignedToId = { old: task.assignedToId ?? undefined, new: dto.assignedToId }
        }

        if (dto.estimatedDuration !== undefined && +task.estimatedDuration.toString() !== dto.estimatedDuration) {
            conflictingProps.estimatedDuration = {
                old: +task.estimatedDuration.toString() ?? undefined,
                new: dto.estimatedDuration,
            }
        }

        return conflictingProps
    }
}
