import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import {
    TaskProjectConnectProjectRepositoryDto,
    TaskProjectDisconnectProjectRepositoryDto,
    TaskUserCreateRepositoryDto,
    TaskUserDeleteRepositoryDto,
    TaskUserGetOneByExternalUserIdRepositoryDto,
    TaskUserUpsertRepositoryDto
} from '../repositories-dto/task-user.repository-dto'

@Injectable()
export class TaskUserRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(dto: TaskUserCreateRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

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
    }

    async upsert(dto: TaskUserUpsertRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

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
    }

    async delete(dto: TaskUserDeleteRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

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
                message: e,
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
    }
}
