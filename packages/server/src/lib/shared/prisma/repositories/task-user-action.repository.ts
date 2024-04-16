import { DefaultError } from '../../errors/default.error'
import { UnexpectedError } from '../../errors/unexpected.error'
import { TPaginatedMeta } from '../../types/paginated-meta.type'
import { parseMetaArgs } from '../../utils'
import { Prisma } from '..'
import { PrismaService } from '../prisma.service'
import {
    TaskUserActionCreateRepositoryDto as TaskUserActionUpsertRepositoryDto,
    TaskUserActionDeleteRepositoryDto,
    TaskUserActionFindManyRepositoryDto,
    TaskUserActionGetOneByCodeRepositoryDto,
    TaskUserActionUpdateRepositoryDto,
} from '../repositories-dto/task-user-action.repository-dto'
import { PrismaTransactionClientType } from '../types/prisma-transaction-client.type'

export const taskUserActionModelExtentions = {
    async extUpsert(
        dto: TaskUserActionUpsertRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { name, code, description } = dto

            const {
                _max: { position: maxPosition },
            } = await client.taskUserAction.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskUserAction.upsert({
                where: {
                    code_isDeleted: {
                        code,
                        isDeleted: false,
                    },
                },
                create: {
                    code,
                    name,
                    description,
                    position:
                        typeof maxPosition === 'number' ? maxPosition + 1 : 0,
                },
                update: {
                    name,
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

    async extUpdate(
        dto: TaskUserActionUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, name, code, description, position: newPosition } = dto

            // We must shift positions of entities between old and new position of status
            if (typeof newPosition === 'number') {
                const { position: oldPosition } =
                    await client.taskStatus.findUniqueOrThrow({
                        where: { id },
                        select: { position: true },
                    })

                // We need to temporary remove record from position flow, for satisfy position unique index
                // Maybe remove unique and just make it serial in db?
                await client.taskStatus.update({
                    where: { id },
                    data: { position: -1 },
                })

                if (newPosition > oldPosition) {
                    await client.taskStatus.updateMany({
                        where: {
                            position: { gt: oldPosition, lte: newPosition },
                        },
                        data: {
                            position: { decrement: 1 },
                        },
                    })
                }

                if (newPosition < oldPosition) {
                    await client.taskStatus.updateMany({
                        where: {
                            position: { gte: newPosition, lt: oldPosition },
                        },
                        data: {
                            position: { increment: 1 },
                        },
                    })
                }
            }

            const { id: updatedId } = await client.taskStatus.update({
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
        dto: TaskUserActionDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id } = dto

            const { id: deletedId } = await client.taskStatus.update({
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
        dto: TaskUserActionFindManyRepositoryDto = {},
        prisma?: any,
    ): Promise<{
        data: Awaited<
            ReturnType<typeof PrismaService.instance.taskUserAction.findMany>
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

            const delegateWhere: Prisma.TaskUserActionWhereInput = {
                isDeleted: false,
            }

            const count = await client.taskUserAction.count({
                where: delegateWhere,
            })

            const data = await client.taskUserAction.findMany({
                where: delegateWhere,
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

    async extGetOneByCode(
        dto: TaskUserActionGetOneByCodeRepositoryDto,
        prisma?: any,
    ): Promise<
        Awaited<
            ReturnType<
                typeof PrismaService.instance.taskUserAction.findUniqueOrThrow
            >
        >
    > {
        try {
            const { code } = dto

            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const data = await client.taskUserAction.findUniqueOrThrow({
                where: {
                    code_isDeleted: {
                        code,
                        isDeleted: false,
                    },
                },
            })

            return data
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
