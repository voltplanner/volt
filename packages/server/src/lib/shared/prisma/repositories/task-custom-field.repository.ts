import { DefaultError } from '../../errors/default.error'
import { UnexpectedError } from '../../errors/unexpected.error'
import { TPaginatedMeta } from '../../types/paginated-meta.type'
import { parseMetaArgs } from '../../utils'
import { Prisma } from '..'
import { PrismaService } from '../prisma.service'
import {
    TaskCustomFieldCreateRepositoryDto,
    TaskCustomFieldDeleteRepositoryDto,
    TaskCustomFieldFindManyRepositoryDto,
    TaskCustomFieldUpdateRepositoryDto,
} from '../repositories-dto/task-custom-field.repository-dto'
import { PrismaTransactionClientType } from '../types/prisma-transaction-client.type'

export const taskCustomFieldModelExtentions = {
    async extCreate(
        dto: TaskCustomFieldCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

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
                message: e,
                metadata: dto,
            })
        }
    },

    async extUpdate(
        dto: TaskCustomFieldUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

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
                message: e,
                metadata: dto,
            })
        }
    },

    async extDelete(
        dto: TaskCustomFieldDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

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
                message: e,
                metadata: dto,
            })
        }
    },

    async extFindMany(
        dto: TaskCustomFieldFindManyRepositoryDto = {},
        prisma?: any,
    ): Promise<{
        data: Awaited<
            ReturnType<typeof PrismaService.instance.taskCustomField.findMany>
        >
        meta: TPaginatedMeta
    }> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

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
                message: e,
                metadata: dto,
            })
        }
    },
}
