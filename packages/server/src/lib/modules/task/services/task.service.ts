import { Inject, Injectable } from '@nestjs/common'

import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
    PrismaTransactionClientType,
} from '../../../shared/prisma'

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

            taskTagIds?: string[]
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        const { taskTagIds } = dto

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

        if (taskTagIds?.length) {
            await client.task.extSetTags(
                {
                    taskId: dto.id,
                    taskTagIds: taskTagIds,
                },
                client,
            )
        }

        return dto.id
    }

    async findMany(dto?: {
        curPage?: number
        perPage?: number

        filterByName?: string
        filterByNumber?: number
        filterByStatusId?: string
        filterByParentId?: string
        filterByProjectId?: string
        filterByCreatedById?: string
        filterByAssignedToId?: string
        filterByCreatedAt?: {
            from?: Date
            to?: Date
        }

        orderBy?: {
            field: 'name' | 'status' | 'createdAt'
            order: OrderEnum
        }
    }) {
        return await this.prisma.task.extFindMany(dto)
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
}
