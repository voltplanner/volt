import { Inject, Injectable } from '@nestjs/common'

import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
    PrismaTransactionClientType,
} from '../../../shared/prisma'

@Injectable()
export class TaskEffortService {
    constructor(
        @Inject(PrismaService)
        private readonly prisma: PrismaServiceWithExtentionsType,
    ) {}

    async create(
        dto: {
            readonly value: number
            readonly taskId: string
            readonly userId: string
            readonly description: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        return await client.taskEffort.extCreate(dto, client)
    }

    async update(
        dto: {
            readonly id: string
            readonly value?: number
            readonly description?: string
            readonly userId?: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma
        const { id, value, description } = dto

        if (value === undefined && !description) {
            return id
        }

        return await client.taskEffort.extUpdate(dto, client)
    }

    async delete(
        dto: {
            readonly id: string
            readonly userId?: string
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        return await client.taskEffort.extDelete(dto, client)
    }

    async findMany(
        dto?: {
            readonly curPage?: number
            readonly perPage?: number

            readonly filterByTaskId?: string
            readonly filterByUserId?: string
            readonly filterByCreatedAt?: {
                readonly from?: Date
                readonly to?: Date
            }

            readonly orderBy?: {
                readonly field: 'createdAt'
                readonly order: OrderEnum
            }
        },
        prisma?: PrismaTransactionClientType,
    ) {
        const client = prisma || this.prisma

        return await client.taskEffort.extFindMany(dto, client)
    }
}
