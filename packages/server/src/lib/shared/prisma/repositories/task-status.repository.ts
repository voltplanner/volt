import { DefaultError } from "../../errors/default.error"
import { UnexpectedError } from "../../errors/unexpected.error"
import { Prisma, TaskStatus } from ".."
import { PrismaService } from "../prisma.service"
import { TaskStatusCreateRepositoryDto, TaskStatusDeleteRepositoryDto, TaskStatusFindManyRepositoryDto, TaskStatusSetDefaultRepositoryDto, TaskStatusUpdateRepositoryDto, TaskStatusUpsertRepositoryDto } from "../repositories-dto/task-status.repository-dto"
import { PrismaTransactionClientType } from "../types/prisma-transaction-client.type"

export const taskStatusModelExtentions = {
    async extCreate(
        dto: TaskStatusCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { name, code, description, isDefault, projectId } = dto

            const { _max: { position: maxPosition } } = await client.taskStatus.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskStatus.create({
                data: {
                    code,
                    name,
                    description,
                    position: typeof maxPosition === 'number' ? maxPosition + 1 : 0,
                    projectId,
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

    async extUpdate(
        dto: TaskStatusUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { id, name, code, description, isDefault, position: newPosition } = dto

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

            if (isDefault === true) {
                await this.extSetDefault({ id: updatedId }, client)
            }

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
        dto: TaskStatusUpsertRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { name, code, description, isDefault, projectId } = dto

            const { _max: { position: maxPosition } } = await client.taskStatus.aggregate({
                _max: { position: true },
            })

            const { id } = await client.taskStatus.upsert({
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
                    position: typeof maxPosition === 'number' ? maxPosition + 1 : 0,
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
        dto: TaskStatusDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

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
        dto: TaskStatusFindManyRepositoryDto,
        prisma?: any,
    ): Promise<TaskStatus[]> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { projectId } = dto

            const delegateWhere: Prisma.TaskStatusWhereInput = {
                projectId,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskStatusOrderByWithRelationAndSearchRelevanceInput = {
                position: 'asc',
            }

            return await client.taskStatus.findMany({
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

    async extGetDefault(
        prisma?: any
    ): Promise<Awaited<ReturnType<typeof PrismaService.instance.taskStatus.findFirstOrThrow>>> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            // Since prisma does not support partial unique indexes we use findFirstOrThrow instead of findUniqueOrThrow
            return await client.taskStatus.findFirstOrThrow({
                where: {
                    isDefault: true,
                },
            })
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e,
            })
        }
    },

    async extSetDefault(
        dto: TaskStatusSetDefaultRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { id } = dto

            const currentDefaultStatus = await client.taskStatus.findFirst({
                where: {
                    isDefault: true,
                },
            })

            if (currentDefaultStatus) {
                await client.taskStatus.update({
                    where: { id: currentDefaultStatus.id },
                    data: { isDefault: false },
                })
            }

            await client.taskStatus.update({
                where: { id: id },
                data: { isDefault: true },
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
