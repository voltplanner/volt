import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import {
    TaskProjectConnectProjectRepositoryDto,
    TaskProjectDisconnectProjectRepositoryDto,
    TaskUserCreateRepositoryDto,
    TaskUserDeleteRepositoryDto,
    TaskUserGetOneByExternalUserIdRepositoryDto
} from '../repositories-dto/task-user.repository-dto'

@Injectable()
export class TaskUserRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(dto: TaskUserCreateRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { externalUserId } = dto

            const { id } = await client.taskUser.create({
                data: { externalId: externalUserId },
                select: { id: true },
            })

            return id
        } catch (e) {
            if (e instanceof DefaultError) {
                throw e
            }

            throw new UnexpectedError({
                message: e.message,
                metadata: dto,
            })
        }
    }

    async delete(dto: TaskUserDeleteRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { externalUserId } = dto

            const { id: deletedId } = await client.taskUser.update({
                where: {
                    externalId_isDeleted: {
                        externalId: externalUserId,
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
                message: e.message,
                metadata: dto,
            })
        }
    }

    async connectProject(
        dto: TaskProjectConnectProjectRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<void> {
        try {
            const client = prisma || this._prisma

            const { userId, projectId } = dto

            await client.taskUser.update({
                where: {
                    id: projectId,
                },
                data: {
                    projects: {
                        connect: {
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
                message: e.message,
                metadata: dto,
            })
        }
    }

    async disconnectProject(
        dto: TaskProjectDisconnectProjectRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<void> {
        try {
            const client = prisma || this._prisma

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
                message: e.message,
                metadata: dto,
            })
        }
    }

    async getOneByExternalUserId(
        dto: TaskUserGetOneByExternalUserIdRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<Awaited<ReturnType<typeof PrismaService.instance.taskUser.findUniqueOrThrow>>> {
        try {
            const client = prisma || this._prisma

            const { externalUserId } = dto

            const userOrmEntity = await client.taskUser.findUniqueOrThrow({
                where: {
                    externalId_isDeleted: {
                        externalId: externalUserId,
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
                message: e.message,
                metadata: dto,
            })
        }
    }
}
