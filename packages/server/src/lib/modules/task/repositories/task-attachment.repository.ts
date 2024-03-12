import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { Prisma, PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import { TPaginatedMeta } from '../../../shared/types/paginated-meta.type'
import { parseMetaArgs } from '../../../shared/utils'
import { TaskAttachmentCreateRepositoryDto, TaskAttachmentDeleteRepositoryDto, TaskAttachmentFindManyRepositoryDto, TaskAttachmentUpdateRepositoryDto } from '../repositories-dto/task-attachment.repository-dto'

@Injectable()
export class TaskAttachmentRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(
        dto: TaskAttachmentCreateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { name, description, externalId, sizeKb, taskId, userId } = dto

            const { id } = await client.taskAttachment.create({
                data: {
                    name,
                    sizeKb,
                    externalId,
                    description,
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
    }

    async update(
        dto: TaskAttachmentUpdateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id, name, description } = dto

            const { id: updatedId } = await client.taskAttachment.update({
                where: { id },
                data: {
                    name,
                    description,
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
        dto: TaskAttachmentDeleteRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id } = dto

            const { id: deletedId } = await client.taskAttachment.update({
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
        dto: TaskAttachmentFindManyRepositoryDto = {},
        prisma?: PrismaTransactionClientType,
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskAttachment.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client = prisma || this._prisma

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskAttachmentWhereInput = {
                name: undefined,
                taskId: undefined,
                userId: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskAttachmentOrderByWithRelationAndSearchRelevanceInput =
                dto.orderBy
                    ? { [dto.orderBy.field]: dto.orderBy.order }
                    : { createdAt: 'desc' }

            if (dto.filterByName) {
                delegateWhere.name = {
                    contains: dto.filterByName,
                    mode: 'insensitive'
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

            const count = await client.taskAttachment.count({
                where: delegateWhere,
            })

            const data = await client.taskAttachment.findMany({
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
}
