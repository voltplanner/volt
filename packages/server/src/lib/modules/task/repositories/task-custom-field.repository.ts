import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { Prisma, PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import { TPaginatedMeta } from '../../../shared/types/paginated-meta.type'
import { parseMetaArgs } from '../../../shared/utils'
import { TaskCustomFieldCreateRepositoryDto, TaskCustomFieldDeleteRepositoryDto, TaskCustomFieldFindManyRepositoryDto, TaskCustomFieldUpdateRepositoryDto } from '../repositories-dto/task-custom-field.repository-dto'

@Injectable()
export class TaskCustomFieldRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(
        dto: TaskCustomFieldCreateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { value, taskId, taskCustomFieldTypeId } = dto

            const { id } = await client.taskCustomField.create({
                data: {
                    value,
                    taskId,
                    taskCustomFieldTypeId,
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
        dto: TaskCustomFieldUpdateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id, value } = dto

            const { id: updatedId } = await client.taskCustomField.update({
                where: { id },
                data: {
                    value,
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
        dto: TaskCustomFieldDeleteRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id } = dto

            const { id: deletedId } = await client.taskCustomField.update({
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
        dto: TaskCustomFieldFindManyRepositoryDto = {},
        prisma?: PrismaTransactionClientType,
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskCustomField.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client = prisma || this._prisma

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskCustomFieldWhereInput = {
                taskId: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskCustomFieldOrderByWithRelationAndSearchRelevanceInput =
                dto.orderBy
                    ? { [dto.orderBy.field]: dto.orderBy.order }
                    : { createdAt: 'desc' }

            if (dto.filterByTaskId) {
                delegateWhere.taskId = dto.filterByTaskId
            }

            const count = await client.taskCustomField.count({
                where: delegateWhere,
            })

            const data = await client.taskCustomField.findMany({
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
