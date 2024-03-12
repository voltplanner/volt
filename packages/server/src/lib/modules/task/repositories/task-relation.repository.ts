import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { Prisma, PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import { TPaginatedMeta } from '../../../shared/types/paginated-meta.type'
import { parseMetaArgs } from '../../../shared/utils'
import {
    TaskRelationConnectTaskRepositoryDto,
    TaskRelationCreateRepositoryDto,
    TaskRelationDeleteRepositoryDto,
    TaskRelationDisconnectTaskRepositoryDto,
    TaskRelationFindManyRepositoryDto,
    TaskRelationUpdateRepositoryDto
} from '../repositories-dto/task-relation.repository-dto'

@Injectable()
export class TaskRelationRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(
        dto: TaskRelationCreateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { code, nameMain, nameForeign, projectId, description } = dto

            const { _max: { position: maxPosition } } = await client.taskRelation.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskRelation.create({
                data: {
                    code,
                    nameMain,
                    nameForeign,
                    description,
                    projectId,
                    position: typeof maxPosition === 'number' ? maxPosition + 1 : 0,
                },
                select: { id: true },
            })

            return id
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e,
                metadata: dto,
            })
        }
    }

    async update(
        dto: TaskRelationUpdateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id, code, nameMain, nameForeign, position: newPosition, description } = dto

            // We must shift positions of entities between old and new position of status
            if (typeof newPosition === 'number') {
                const { position: oldPosition } =
                    await client.taskRelation.findUniqueOrThrow({
                        where: { id },
                        select: { position: true },
                    })

                // We need to temporary remove record from position flow, for satisfy position unique index
                // Maybe remove unique and just make it serial in db?
                await client.taskRelation.update({
                    where: { id },
                    data: { position: -1 },
                })

                if (newPosition > oldPosition) {
                    await client.taskRelation.updateMany({
                        where: {
                            position: { gt: oldPosition, lte: newPosition },
                        },
                        data: {
                            position: { decrement: 1 },
                        },
                    })
                }

                if (newPosition < oldPosition) {
                    await client.taskRelation.updateMany({
                        where: {
                            position: { gte: newPosition, lt: oldPosition },
                        },
                        data: {
                            position: { increment: 1 },
                        },
                    })
                }
            }

            const { id: updatedId } = await client.taskRelation.update({
                where: { id },
                data: {
                    code,
                    nameMain,
                    nameForeign,
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
                message: e,
                metadata: dto,
            })
        }
    }

    async delete(
        dto: TaskRelationDeleteRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id } = dto

            const { id: deletedId } = await client.taskRelation.update({
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
                message: e,
                metadata: dto,
            })
        }
    }

    async findMany(
        dto: TaskRelationFindManyRepositoryDto = {},
        prisma?: PrismaTransactionClientType,
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskRelation.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client = prisma || this._prisma

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskRelationWhereInput = {
                nameMain: undefined,
                nameForeign: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskRelationOrderByWithRelationAndSearchRelevanceInput =
                dto.orderBy
                    ? { [dto.orderBy.field]: dto.orderBy.order }
                    : { position: 'asc' }

            if (dto.filterByNameMain) {
                delegateWhere.nameMain = delegateWhere.nameForeign = {
                    contains: dto.filterByNameMain,
                    mode: 'insensitive',
                }
            }

            if (dto.filterByNameForeign) {
                delegateWhere.nameMain = delegateWhere.nameForeign = {
                    contains: dto.filterByNameForeign,
                    mode: 'insensitive',
                }
            }

            if (dto.filterByCreatedAt?.from || dto.filterByCreatedAt?.to) {
                delegateWhere.createdAt = {
                    gte: dto.filterByCreatedAt?.from ?? undefined,
                    lte: dto.filterByCreatedAt?.to ?? undefined,
                }
            }

            const count = await client.taskRelation.count({
                where: delegateWhere,
            })

            const data = await client.taskRelation.findMany({
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
                message: e,
                metadata: dto,
            })
        }
    }

    async connectTask(
        dto: TaskRelationConnectTaskRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<void> {
        try {
            const client = prisma || this._prisma

            const { taskMainId, taskForeignId, taskRelationId } = dto

            await client.taskRelation.update({
                where: {
                    id: taskRelationId,
                },
                data: {
                    tasks: {
                        create: {
                            taskMainId,
                            taskForeignId,
                        },
                    },
                },
            })
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e,
                metadata: dto,
            })
        }
    }

    async disconnectTask(
        dto: TaskRelationDisconnectTaskRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<void> {
        try {
            const client = prisma || this._prisma

            const { taskMainId, taskForeignId, taskRelationId } = dto

            await client.taskRelation.update({
                where: {
                    id: taskRelationId,
                },
                data: {
                    tasks: {
                        disconnect: {
                            taskMainId_taskForeignId: {
                                taskMainId,
                                taskForeignId,
                            },
                        },
                    },
                },
            })
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e,
                metadata: dto,
            })
        }
    }
}
