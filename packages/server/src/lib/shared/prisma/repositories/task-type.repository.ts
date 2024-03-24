import { DefaultError } from "../../errors/default.error"
import { UnexpectedError } from "../../errors/unexpected.error"
import { TPaginatedMeta } from "../../types/paginated-meta.type"
import { parseMetaArgs } from "../../utils"
import { Prisma } from ".."
import { PrismaService } from "../prisma.service"
import { TaskTypeCreateRepositoryDto, TaskTypeDeleteRepositoryDto, TaskTypeFindManyRepositoryDto, TaskTypeUpdateRepositoryDto } from "../repositories-dto/task-type.repository-dto"
import { PrismaTransactionClientType } from "../types/prisma-transaction-client.type"

export const taskTypeModelExtentions = {
    async extCreate(
        dto: TaskTypeCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { name, code, description, projectId } = dto

            const { _max: { position: maxPosition } } = await client.taskType.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskType.create({
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
                message: e,
                metadata: dto,
            })
        }
    },

    async extUpdate(
        dto: TaskTypeUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { id, name, code, description, position: newPosition } = dto

            // We must shift positions of entities between old and new position of status
            if (typeof newPosition === 'number') {
                const { position: oldPosition } =
                    await client.taskType.findUniqueOrThrow({
                        where: { id },
                        select: { position: true },
                    })

                // We need to temporary remove record from position flow, for satisfy position unique index
                // Maybe remove unique and just make it serial in db?
                await client.taskType.update({
                    where: { id },
                    data: { position: -1 },
                })

                if (newPosition > oldPosition) {
                    await client.taskType.updateMany({
                        where: {
                            position: { gt: oldPosition, lte: newPosition },
                        },
                        data: {
                            position: { decrement: 1 },
                        },
                    })
                }

                if (newPosition < oldPosition) {
                    await client.taskType.updateMany({
                        where: {
                            position: { gte: newPosition, lt: oldPosition },
                        },
                        data: {
                            position: { increment: 1 },
                        },
                    })
                }
            }

            const { id: updatedId } = await client.taskType.update({
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
                message: e,
                metadata: dto,
            })
        }
    },

    async extDelete(
        dto: TaskTypeDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { id } = dto

            const { id: deletedId } = await client.taskType.update({
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
        dto: TaskTypeFindManyRepositoryDto = {},
        prisma?: any,
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskType.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskTypeWhereInput = {
                name: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskTypeOrderByWithRelationAndSearchRelevanceInput =
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

            const count = await client.taskType.count({
                where: delegateWhere,
            })

            const data = await client.taskType.findMany({
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
