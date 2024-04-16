import { DefaultError } from '../../errors/default.error'
import { UnexpectedError } from '../../errors/unexpected.error'
import { Prisma } from '..'
import { PrismaService } from '../prisma.service'
import {
    TaskProjectConnectProjectRepositoryDto,
    TaskProjectDisconnectProjectRepositoryDto,
    TaskUserCreateRepositoryDto,
    TaskUserFindAllRepositoryDto,
} from '../repositories-dto/task-user.repository-dto'
import { PrismaTransactionClientType } from '../types/prisma-transaction-client.type'

export const taskUserModelExtentions = {
    async extCreate(
        dto: TaskUserCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, roleId } = dto

            await client.taskUser.create({
                data: {
                    id,
                    roleId,
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

    async extUpsert(
        dto: TaskUserCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, roleId } = dto

            await client.taskUser.upsert({
                where: { id },
                create: {
                    id,
                    roleId,
                },
                update: {
                    roleId,
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

    async extFindAll(
        dto: TaskUserFindAllRepositoryDto,
        prisma?: any,
    ): Promise<string[]> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { projectId } = dto

            const delegateWhere: Prisma.TaskUserWhereInput = {
                projects: {
                    some: {
                        projectId,
                    },
                },
            }

            const data = await client.taskUser.findMany({
                where: delegateWhere,
                select: {
                    id: true,
                },
            })

            return data.map(({ id }) => id)
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
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, projectId } = dto

            await client.taskUser.update({
                where: {
                    id,
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
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id, projectId } = dto

            await client.taskUser.update({
                where: {
                    id: projectId,
                },
                data: {
                    projects: {
                        disconnect: {
                            projectId_userId: {
                                projectId,
                                userId: id,
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
