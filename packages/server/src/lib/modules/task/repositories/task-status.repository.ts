import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { Prisma, PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import { TPaginatedMeta } from '../../../shared/types/paginated-meta.type'
import { parseMetaArgs } from '../../../shared/utils'
import {
    TaskStatusCreateRepositoryDto,
    TaskStatusDeleteRepositoryDto,
    TaskStatusFindManyRepositoryDto,
    TaskStatusUpdateRepositoryDto
} from '../repositories-dto/task-status.repository-dto'

@Injectable()
export class TaskStatusRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(
        dto: TaskStatusCreateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { name, code, description, projectId } = dto

            const { _max: { position: maxPosition } } = await client.taskStatus.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskStatus.create({
                data: {
                    code,
                    name,
                    description,
                    position: typeof maxPosition === 'number' ? maxPosition + 1 : 0,
                    projectId,
                },
                select: { id: true },
            })

            return id
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e.message,
                metadata: dto,
            })
        }
    }

    async update(
        dto: TaskStatusUpdateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id, name, code, description, position: newPosition } = dto

            // We must shift positions of entities between old and new position of status
            if (typeof newPosition === 'number') {
                const { position: oldPosition } =
                    await client.taskStatus.findUniqueOrThrow({
                        where: { id },
                        select: { position: true },
                    })

                // We need to temporary remove record from position flow, for satisfy position unique index
                // Maybe remove unique and just make it serial in db?
                await client.taskStatus.update({
                    where: { id },
                    data: { position: -1 },
                })

                if (newPosition > oldPosition) {
                    await client.taskStatus.updateMany({
                        where: {
                            position: { gt: oldPosition, lte: newPosition },
                        },
                        data: {
                            position: { decrement: 1 },
                        },
                    })
                }

                if (newPosition < oldPosition) {
                    await client.taskStatus.updateMany({
                        where: {
                            position: { gte: newPosition, lt: oldPosition },
                        },
                        data: {
                            position: { increment: 1 },
                        },
                    })
                }
            }

            const { id: updatedId } = await client.taskStatus.update({
                where: { id },
                data: {
                    code,
                    name,
                    description,
                    position: newPosition,
                },
                select: { id: true },
            })

            return updatedId
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e.message,
                metadata: dto,
            })
        }
    }

    async delete(
        dto: TaskStatusDeleteRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id } = dto

            const { id: deletedId } = await client.taskStatus.update({
                where: { id },
                data: { isDeleted: true },
                select: { id: true },
            })

            return deletedId
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e.message,
                metadata: dto,
            })
        }
    }

    async findMany(
        dto: TaskStatusFindManyRepositoryDto = {},
        prisma?: PrismaTransactionClientType,
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskStatus.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client = prisma || this._prisma

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskStatusWhereInput = {
                name: undefined,
                createdAt: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskStatusOrderByWithRelationAndSearchRelevanceInput =
                dto.orderBy
                    ? { [dto.orderBy.field]: dto.orderBy.order }
                    : { position: 'asc' }

            if (dto.filterByName) {
                delegateWhere.name = {
                    contains: dto.filterByName,
                    mode: 'insensitive',
                }
            }

            if (dto.filterByCreatedAt?.from || dto.filterByCreatedAt?.to) {
                delegateWhere.createdAt = {
                    gte: dto.filterByCreatedAt?.from ?? undefined,
                    lte: dto.filterByCreatedAt?.to ?? undefined,
                }
            }

            const count = await client.taskStatus.count({
                where: delegateWhere,
            })

            const data = await client.taskStatus.findMany({
                where: delegateWhere,
                orderBy: delegateOrderBy,
                take,
                skip,
            })

            return {
                data,
                meta: {
                    curPage,
                    perPage,
                    total: count,
                },
            }
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e.message,
                metadata: dto,
            })
        }
    }
}
