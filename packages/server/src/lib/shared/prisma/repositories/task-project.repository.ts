import { DefaultError } from "../../errors/default.error"
import { UnexpectedError } from "../../errors/unexpected.error"
import { TPaginatedMeta } from "../../types/paginated-meta.type"
import { parseMetaArgs } from "../../utils"
import { Prisma } from ".."
import { PrismaService } from "../prisma.service"
import { TaskProjectConnectUsersRepositoryDto, TaskProjectCreateRepositoryDto, TaskProjectDeleteRepositoryDto, TaskProjectDisconnectUsersRepositoryDto, TaskProjectFindManyRepositoryDto, TaskProjectUpdateRepositoryDto } from "../repositories-dto/task-project.repository-dto"
import { PrismaTransactionClientType } from "../types/prisma-transaction-client.type"

export const taskProjectModelExtentions = {
    async extCreate(
        dto: TaskProjectCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { name, budget, deadline, description } = dto

            const { id } = await client.taskProject.create({
                data: {
                    name,
                    budget,
                    deadline,
                    version: 0,
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
    },

    async extUpdate(dto: TaskProjectUpdateRepositoryDto, prisma?: any): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { id, version, name, budget, deadline, description } = dto

            const { id: updatedId } = await client.taskProject.update({
                where: { id, version },
                data: {
                    name,
                    budget,
                    deadline,
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
    },

    async extDelete(dto: TaskProjectDeleteRepositoryDto, prisma?: any): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

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
    },

    async extFindMany(dto: TaskProjectFindManyRepositoryDto = {}, prisma?: any): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskProject.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskProjectWhereInput = {
                name: undefined,
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

            if (dto.filterByUserId) {
                delegateWhere.users = {
                    some: { userId: dto.filterByUserId },
                }
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
    },

    async extConnectUsers(
        dto: TaskProjectConnectUsersRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { projectId, userIds } = dto

            await client.taskProjectOnUser.createMany({
                data: userIds.map(userId => ({
                    projectId,
                    userId,
                })),
                skipDuplicates: true,
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
    },

    async extDisconnectUsers(
        dto: TaskProjectDisconnectUsersRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { projectId, userIds } = dto

            await client.taskProjectOnUser.deleteMany({
                where: {
                    OR: userIds.map(userId => ({
                        projectId,
                        userId,
                    })),
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
    },
}
