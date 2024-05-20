import { DefaultError } from '../../errors/default.error'
import { UnexpectedError } from '../../errors/unexpected.error'
import { TPaginatedMeta } from '../../types/paginated-meta.type'
import { parseMetaArgs } from '../../utils'
import { Prisma } from '..'
import { PrismaService } from '../prisma.service'
import {
    TaskCommentCreateRepositoryDto,
    TaskCommentDeleteRepositoryDto,
    TaskCommentFindManyRepositoryDto,
    TaskCommentUpdateRepositoryDto,
} from '../repositories-dto/task-comment.repository-dto'
import { PrismaTransactionClientType } from '../types/prisma-transaction-client.type'

export const taskCommentModelExtentions = {
    async extCreate(
        dto: TaskCommentCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { text, taskId, userId } = dto

            const { id } = await client.taskComment.create({
                data: {
                    text,
                    taskId,
                    userId,
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
        dto: TaskCommentUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, userId, text } = dto

            const { id: updatedId } = await client.taskComment.update({
                where: { id, userId },
                data: {
                    text,
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
        dto: TaskCommentDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, userId } = dto

            const { id: deletedId } = await client.taskComment.update({
                where: { id, userId },
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
        dto: TaskCommentFindManyRepositoryDto = {},
        prisma?: any,
    ): Promise<{
        data: Awaited<
            ReturnType<typeof PrismaService.instance.taskComment.findMany>
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

            const delegateWhere: Prisma.TaskCommentWhereInput = {
                text: undefined,
                taskId: undefined,
                userId: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskCommentOrderByWithRelationAndSearchRelevanceInput =
                dto.orderBy
                    ? { [dto.orderBy.field]: dto.orderBy.order }
                    : { createdAt: 'desc' }

            if (dto.filterByText) {
                delegateWhere.text = {
                    contains: dto.filterByText,
                    mode: 'insensitive',
                }
            }

            if (dto.filterByTaskId) {
                delegateWhere.taskId = dto.filterByTaskId
            }

            if (dto.filterByUserId) {
                delegateWhere.taskId = dto.filterByUserId
            }

            if (dto.filterByCreatedAt?.from || dto.filterByCreatedAt?.to) {
                delegateWhere.createdAt = {
                    gte: dto.filterByCreatedAt?.from ?? undefined,
                    lte: dto.filterByCreatedAt?.to ?? undefined,
                }
            }

            const count = await client.taskComment.count({
                where: delegateWhere,
            })

            const data = await client.taskComment.findMany({
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
