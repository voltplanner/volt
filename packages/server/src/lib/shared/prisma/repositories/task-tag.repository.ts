import { DefaultError } from '../../errors/default.error'
import { UnexpectedError } from '../../errors/unexpected.error'
import { Prisma } from '..'
import { PrismaService } from '../prisma.service'
import {
    TaskTagConnectTaskRepositoryDto,
    TaskTagCreateRepositoryDto,
    TaskTagDeleteRepositoryDto,
    TaskTagDisconnectTaskRepositoryDto,
    TaskTagFindManyRepositoryDto,
    TaskTagUpdateRepositoryDto,
    TaskTagUpsertRepositoryDto,
} from '../repositories-dto/task-tag.repository-dto'
import { PrismaTransactionClientType } from '../types/prisma-transaction-client.type'

export const taskTagModelExtentions = {
    async extCreate(
        dto: TaskTagCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { code, name, description, projectId } = dto

            const {
                _max: { position: maxPosition },
            } = await client.taskTag.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskTag.create({
                data: {
                    code,
                    name,
                    description,
                    position:
                        typeof maxPosition === 'number' ? maxPosition + 1 : 0,
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
        dto: TaskTagUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, name, code, description, position: newPosition } = dto

            // We must shift positions of entities between old and new position of status
            if (typeof newPosition === 'number') {
                const { position: oldPosition } =
                    await client.taskTag.findUniqueOrThrow({
                        where: { id },
                        select: { position: true },
                    })

                // We need to temporary remove record from position flow, for satisfy position unique index
                // Maybe remove unique and just make it serial in db?
                await client.taskTag.update({
                    where: { id },
                    data: { position: -1 },
                })

                if (newPosition > oldPosition) {
                    await client.taskTag.updateMany({
                        where: {
                            position: { gt: oldPosition, lte: newPosition },
                        },
                        data: {
                            position: { decrement: 1 },
                        },
                    })
                }

                if (newPosition < oldPosition) {
                    await client.taskTag.updateMany({
                        where: {
                            position: { gte: newPosition, lt: oldPosition },
                        },
                        data: {
                            position: { increment: 1 },
                        },
                    })
                }
            }

            const { id: updatedId } = await client.taskTag.update({
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

    async extUpsert(
        dto: TaskTagUpsertRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { name, code, description, isDefault, projectId } = dto

            const {
                _max: { position: maxPosition },
            } = await client.taskTag.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskTag.upsert({
                where: {
                    code_isDeleted: {
                        code,
                        isDeleted: false,
                    },
                },
                create: {
                    code,
                    name,
                    projectId,
                    description,
                    position:
                        typeof maxPosition === 'number' ? maxPosition + 1 : 0,
                },
                update: {
                    code,
                    name,
                    projectId,
                    description,
                },
                select: { id: true },
            })

            if (isDefault === true) {
                await this.extSetDefault({ id }, client)
            }

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
        dto: TaskTagDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id } = dto

            const { id: deletedId } = await client.taskTag.update({
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
        dto: TaskTagFindManyRepositoryDto,
        prisma?: any,
    ): Promise<
        Awaited<ReturnType<typeof PrismaService.instance.taskTag.findMany>>
    > {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { projectId } = dto

            const delegateWhere: Prisma.TaskTagWhereInput = {
                projectId,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskTagOrderByWithRelationAndSearchRelevanceInput =
                {
                    position: 'asc',
                }

            return await client.taskTag.findMany({
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
        dto: TaskTagConnectTaskRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { taskTagId, taskId } = dto

            await client.taskTag.update({
                where: {
                    id: taskTagId,
                },
                data: {
                    tasks: {
                        create: {
                            taskId,
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
        dto: TaskTagDisconnectTaskRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { taskTagId, taskId } = dto

            await client.taskTag.update({
                where: {
                    id: taskTagId,
                },
                data: {
                    tasks: {
                        disconnect: {
                            taskId_taskTagId: {
                                taskId,
                                taskTagId,
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
