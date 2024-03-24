import { DefaultError } from "../../errors/default.error"
import { UnexpectedError } from "../../errors/unexpected.error"
import { PrismaService } from "../prisma.service"
import { TaskProjectConnectProjectRepositoryDto, TaskProjectDisconnectProjectRepositoryDto, TaskUserCreateRepositoryDto, TaskUserDeleteRepositoryDto, TaskUserGetOneByExternalUserIdRepositoryDto, TaskUserUpsertRepositoryDto } from "../repositories-dto/task-user.repository-dto"
import { PrismaTransactionClientType } from "../types/prisma-transaction-client.type"

export const taskUserModelExtentions = {
    async extCreate(dto: TaskUserCreateRepositoryDto, prisma?: any): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { userId } = dto

            const { id } = await client.taskUser.create({
                data: { externalId: userId },
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

    async extUpsert(dto: TaskUserUpsertRepositoryDto, prisma?: any): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { userId } = dto

            const { id } = await client.taskUser.upsert({
                where: {
                    externalId_isDeleted: {
                        externalId: userId,
                        isDeleted: false,
                    },
                },
                create: {
                    externalId: userId,
                },
                update: {},
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

    async extDelete(dto: TaskUserDeleteRepositoryDto, prisma?: any): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { userId } = dto

            const { id: deletedId } = await client.taskUser.update({
                where: {
                    externalId_isDeleted: {
                        externalId: userId,
                        isDeleted: false,
                    },
                },
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

    async extConnectProject(
        dto: TaskProjectConnectProjectRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { userId, projectId } = dto

            await client.taskUser.update({
                where: {
                    id: userId,
                },
                data: {
                    projects: {
                        create: {
                            projectId,
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

    async extDisconnectProject(
        dto: TaskProjectDisconnectProjectRepositoryDto,
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { userId, projectId } = dto

            await client.taskUser.update({
                where: {
                    id: projectId,
                },
                data: {
                    projects: {
                        disconnect: {
                            projectId_userId: {
                                projectId,
                                userId,
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

    async extGetOneByExternalUserId(
        dto: TaskUserGetOneByExternalUserIdRepositoryDto,
        prisma?: any,
    ): Promise<Awaited<ReturnType<typeof PrismaService.instance.taskUser.findUniqueOrThrow>>> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { userId } = dto

            const userOrmEntity = await client.taskUser.findUniqueOrThrow({
                where: {
                    externalId_isDeleted: {
                        externalId: userId,
                        isDeleted: false,
                    },
                },
            })

            return userOrmEntity
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
