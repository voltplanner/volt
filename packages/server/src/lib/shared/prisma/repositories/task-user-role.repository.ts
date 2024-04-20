import { DefaultError } from '../../errors/default.error'
import { UnexpectedError } from '../../errors/unexpected.error'
import { Prisma } from '..'
import { PrismaService } from '../prisma.service'
import {
    TaskUserRoleDeleteRepositoryDto,
    TaskUserRoleFindManyRepositoryDto,
    TaskUserRoleGetOneByCodeRepositoryDto,
    TaskUserRoleUpdateRepositoryDto,
    TaskUserRoleUpsertRepositoryDto,
} from '../repositories-dto/task-user-role.repository-dto'
import { PrismaTransactionClientType } from '../types/prisma-transaction-client.type'

export const taskUserRoleModelExtentions = {
    async extUpsert(
        dto: TaskUserRoleUpsertRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { name, code, projectId, description } = dto

            const {
                _max: { position: maxPosition },
            } = await client.taskUserRole.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskUserRole.upsert({
                where: {
                    code_projectId_isDeleted: {
                        code,
                        projectId,
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
                    name,
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

    async extUpdate(
        dto: TaskUserRoleUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, name, code, description, position: newPosition } = dto

            // We must shift positions of entities between old and new position of status
            if (typeof newPosition === 'number') {
                const { position: oldPosition } =
                    await client.taskUserRole.findUniqueOrThrow({
                        where: { id },
                        select: { position: true },
                    })

                // We need to temporary remove record from position flow, for satisfy position unique index
                // Maybe remove unique and just make it serial in db?
                await client.taskUserRole.update({
                    where: { id },
                    data: { position: -1 },
                })

                if (newPosition > oldPosition) {
                    await client.taskUserRole.updateMany({
                        where: {
                            position: { gt: oldPosition, lte: newPosition },
                        },
                        data: {
                            position: { decrement: 1 },
                        },
                    })
                }

                if (newPosition < oldPosition) {
                    await client.taskUserRole.updateMany({
                        where: {
                            position: { gte: newPosition, lt: oldPosition },
                        },
                        data: {
                            position: { increment: 1 },
                        },
                    })
                }
            }

            const { id: updatedId } = await client.taskUserRole.update({
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
        dto: TaskUserRoleDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id } = dto

            const { id: deletedId } = await client.taskUserRole.update({
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
        dto: TaskUserRoleFindManyRepositoryDto,
        prisma?: any,
    ): Promise<
        Awaited<ReturnType<typeof PrismaService.instance.taskUserRole.findMany>>
    > {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { projectId } = dto

            const delegateWhere: Prisma.TaskUserRoleWhereInput = {
                projectId,
                isDeleted: false,
            }

            return await client.taskUserRole.findMany({
                where: delegateWhere,
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

    async extGetOneByCode(
        dto: TaskUserRoleGetOneByCodeRepositoryDto,
        prisma?: any,
    ): Promise<
        Awaited<
            ReturnType<
                typeof PrismaService.instance.taskUserRole.findUniqueOrThrow
            >
        >
    > {
        try {
            const { code, projectId } = dto

            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const data = await client.taskUserRole.findUniqueOrThrow({
                where: {
                    code_projectId_isDeleted: {
                        code,
                        projectId,
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
