import { Inject, Injectable } from '@nestjs/common'

import {
    PrismaService,
    PrismaServiceWithExtentionsType,
    PrismaTransactionClientType,
} from '../../../shared/prisma'

@Injectable()
export class TaskService {
    constructor(
        @Inject(PrismaService)
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    async taskFindMany(dto?: {
        assignedToId?: string
        curPage?: number
        perPage?: number
    }) {
        const { assignedToId, curPage, perPage } = dto || {}

        return await this._prismaService.task.extFindMany({
            filterByAssignedToId: assignedToId,
            curPage,
            perPage,
        })
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
        const client = prisma || this._prismaService

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

    async taskCreate(
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
        const client = prisma || this._prismaService

        const id = await client.task.extCreate(dto, client)

        return id
    }

    /**
     * New default status will replace the current.
     */
    async statusSetDefault(
        dto: {
            readonly id: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { id } = dto

        const client = prisma || this._prismaService

        await client.taskStatus.extSetDefault(
            {
                id,
            },
            client,
        )

        return id
    }

    async customFieldValueTypeUpsert(
        dto: {
            readonly code: string
            readonly name: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const { code, name } = dto

        const client = prisma || this._prismaService

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
