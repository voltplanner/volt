import { Inject, Injectable } from '@nestjs/common'

import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
    PrismaTransactionClientType,
} from '../../../shared/prisma'
import { TASK_CONFIG, TaskConfig } from '../configs/task-module.config'

@Injectable()
export class TaskCommentService {
    constructor(
        @Inject(PrismaService)
        private readonly prisma: PrismaServiceWithExtentionsType,
        @Inject(TASK_CONFIG)
        private readonly config: TaskConfig,
    ) {}

    async create(
        dto: {
            readonly taskId: string
            readonly userId: string
            readonly text: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        return await client.taskComment.extCreate(dto, client)
    }

    async update(
        dto: {
            readonly id: string
            readonly text: string
            readonly userId?: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        return await client.taskComment.extUpdate(dto, client)
    }

    async delete(
        dto: {
            readonly id: string
            readonly userId?: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        return await client.taskComment.extDelete(dto, client)
    }

    async findMany(dto?: {
        taskId: string

        curPage?: number
        perPage?: number

        orderBy?: {
            field: 'createdAt'
            order: OrderEnum
        }
    }, prisma?: PrismaTransactionClientType,) {
        const { taskId, ...other } = dto

        const client = prisma || this.prisma

        return await client.taskComment.extFindMany({
            ...other,
            filterByTaskId: taskId,
        })
    }
}
