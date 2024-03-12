import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { Prisma, PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import { TPaginatedMeta } from '../../../shared/types/paginated-meta.type'
import { parseMetaArgs } from '../../../shared/utils'
import {
    TaskProjectConnectUserRepositoryDto,
    TaskProjectCreateRepositoryDto,
    TaskProjectDeleteRepositoryDto,
    TaskProjectDisconnectUserRepositoryDto,
    TaskProjectFindManyRepositoryDto,
    TaskProjectUpdateRepositoryDto
} from '../repositories-dto/task-project.repository-dto'

@Injectable()
export class TaskProjectRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(dto: TaskProjectCreateRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { name, statusId, description, internalUserId: createdById } = dto

            const { id } = await client.taskProject.create({
                data: {
                    name,
                    statusId,
                    createdById,
                    description,
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

    async update(dto: TaskProjectUpdateRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id, version, name, statusId, description } = dto

            const { id: updatedId } = await client.taskProject.update({
                where: { id, version },
                data: {
                    name,
                    statusId,
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

    async delete(dto: TaskProjectDeleteRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { id } = dto

            const { id: deletedId } = await client.taskProject.update({
                where: { id },
                data: {
                    isDeleted: true,
                },
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

    async findMany(dto: TaskProjectFindManyRepositoryDto = {}, prisma?: PrismaTransactionClientType): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskProject.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client = prisma || this._prisma

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskProjectWhereInput = {
                name: undefined,
                status: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskProjectOrderByWithRelationAndSearchRelevanceInput =
                dto.orderBy
                    ? { [dto.orderBy.field]: dto.orderBy.order }
                    : { createdAt: 'desc' }

            if (dto.filterByName) {
                delegateWhere.name = {
                    contains: dto.filterByName,
                    mode: 'insensitive',
                }
            }

            if (dto.filterByStatusId) {
                delegateWhere.statusId = dto.filterByStatusId
            }

            if (dto.filterByCreatedAt?.from || dto.filterByCreatedAt?.to) {
                delegateWhere.createdAt = {
                    gte: dto.filterByCreatedAt?.from ?? undefined,
                    lte: dto.filterByCreatedAt?.to ?? undefined,
                }
            }

            const count = await client.taskProject.count({
                where: delegateWhere,
            })

            const data = await client.taskProject.findMany({
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

    async connectUser(
        dto: TaskProjectConnectUserRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<void> {
        try {
            const client = prisma || this._prisma

            const { internalUserId, projectId } = dto

            await client.taskProject.update({
                where: {
                    id: projectId,
                },
                data: {
                    users: {
                        create: {
                            userId: internalUserId,
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

    async disconnectUser(
        dto: TaskProjectDisconnectUserRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<void> {
        try {
            const client = prisma || this._prisma

            const { internalUserId, projectId } = dto

            await client.taskProject.update({
                where: {
                    id: projectId,
                },
                data: {
                    users: {
                        disconnect: {
                            projectId_userId: {
                                projectId,
                                userId: internalUserId,
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
