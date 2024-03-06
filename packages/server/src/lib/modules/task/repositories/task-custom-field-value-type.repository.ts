import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { Prisma, PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import { TPaginatedMeta } from '../../../shared/types/paginated-meta.type'
import { parseMetaArgs } from '../../../shared/utils'
import { TaskCustomFieldValueTypeCreateRepositoryDto, TaskCustomFieldValueTypeDeleteRepositoryDto, TaskCustomFieldValueTypeFindManyRepositoryDto, TaskCustomFieldValueTypeUpdateRepositoryDto } from '../repositories-dto/task-custom-field-value-type.repository-dto'

@Injectable()
export class TaskCustomFieldValueTypeRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(
        dto: TaskCustomFieldValueTypeCreateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { code, name } = dto

            const { _max: { position: maxPosition } } = await client.taskCustomFieldValueType.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskCustomFieldValueType.create({
                data: {
                    code,
                    name,
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
                message: e.message,
                metadata: dto,
            })
        }
    }

    async update(
        dto: TaskCustomFieldValueTypeUpdateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id, name, code, position: newPosition } = dto

            // We must shift positions of entities between old and new position of status
            if (typeof newPosition === 'number') {
                const { position: oldPosition } =
                    await client.taskCustomFieldValueType.findUniqueOrThrow({
                        where: { id },
                        select: { position: true },
                    })

                // We need to temporary remove record from position flow, for satisfy position unique index
                // Maybe remove unique and just make it serial in db?
                await client.taskCustomFieldValueType.update({
                    where: { id },
                    data: { position: -1 },
                })

                if (newPosition > oldPosition) {
                    await client.taskCustomFieldValueType.updateMany({
                        where: {
                            position: { gt: oldPosition, lte: newPosition },
                        },
                        data: {
                            position: { decrement: 1 },
                        },
                    })
                }

                if (newPosition < oldPosition) {
                    await client.taskCustomFieldValueType.updateMany({
                        where: {
                            position: { gte: newPosition, lt: oldPosition },
                        },
                        data: {
                            position: { increment: 1 },
                        },
                    })
                }
            }

            const { id: updatedId } = await client.taskCustomFieldValueType.update({
                where: { id },
                data: {
                    code,
                    name,
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
        dto: TaskCustomFieldValueTypeDeleteRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id } = dto

            const { id: deletedId } = await client.taskCustomFieldValueType.update({
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
        dto: TaskCustomFieldValueTypeFindManyRepositoryDto = {},
        prisma?: PrismaTransactionClientType,
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskCustomFieldValueType.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client = prisma || this._prisma

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskCustomFieldValueTypeWhereInput = {
                name: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskCustomFieldValueTypeOrderByWithRelationAndSearchRelevanceInput =
                dto.orderBy
                    ? { [dto.orderBy.field]: dto.orderBy.order }
                    : { position: 'asc' }

            if (dto.filterByName) {
                delegateWhere.name = {
                    contains: dto.filterByName,
                    mode: 'insensitive',
                }
            }

            const count = await client.taskCustomFieldValueType.count({
                where: delegateWhere,
            })

            const data = await client.taskCustomFieldValueType.findMany({
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
