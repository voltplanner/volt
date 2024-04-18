import { DefaultError } from '../../errors/default.error'
import { UnexpectedError } from '../../errors/unexpected.error'
import { Prisma, TaskRelation } from '..'
import { PrismaService } from '../prisma.service'
import {
    TaskRelationConnectTaskRepositoryDto,
    TaskRelationCreateRepositoryDto,
    TaskRelationDeleteRepositoryDto,
    TaskRelationDisconnectTaskRepositoryDto,
    TaskRelationFindManyRepositoryDto,
    TaskRelationUpdateRepositoryDto,
    TaskRelationUpsertRepositoryDto,
} from '../repositories-dto/task-relation.repository-dto'
import { PrismaTransactionClientType } from '../types/prisma-transaction-client.type'

export const taskRelationModelExtentions = {
    async extCreate(
        dto: TaskRelationCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { code, nameMain, nameForeign, projectId, description } = dto

            const {
                _max: { position: maxPosition },
            } = await client.taskRelation.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskRelation.create({
                data: {
                    code,
                    nameMain,
                    nameForeign,
                    description,
                    projectId,
                    position:
                        typeof maxPosition === 'number' ? maxPosition + 1 : 0,
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
        dto: TaskRelationUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const {
                id,
                code,
                nameMain,
                nameForeign,
                position: newPosition,
                description,
            } = dto

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
    },

    async extUpsert(
        dto: TaskRelationUpsertRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { code, nameMain, nameForeign, description, projectId } = dto

            const {
                _max: { position: maxPosition },
            } = await client.taskRelation.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskRelation.upsert({
                where: {
                    code_isDeleted: {
                        code,
                        isDeleted: false,
                    },
                },
                create: {
                    code,
                    nameMain,
                    nameForeign,
                    projectId,
                    description,
                    position:
                        typeof maxPosition === 'number' ? maxPosition + 1 : 0,
                },
                update: {
                    code,
                    nameMain,
                    nameForeign,
                    projectId,
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

    async extDelete(
        dto: TaskRelationDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

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
    },

    async extFindMany(
        dto: TaskRelationFindManyRepositoryDto,
        prisma?: any,
    ): Promise<TaskRelation[]> {
        const { projectId } = dto

        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const delegateWhere: Prisma.TaskRelationWhereInput = {
                projectId,
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

            return await client.taskRelation.findMany({
                where: delegateWhere,
                orderBy: delegateOrderBy,
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

    async extConnectTask(
        dto: TaskRelationConnectTaskRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

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
    },

    async extDisconnectTask(
        dto: TaskRelationDisconnectTaskRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

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
    },
}
