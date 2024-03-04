import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import { TaskUserCreateRepositoryDto, TaskUserDeleteRepositoryDto } from '../repositories-dto/task-user.repository-dto'

@Injectable()
export class TaskUserRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(dto: TaskUserCreateRepositoryDto, prisma?: PrismaTransactionClientType): Promise<string> {
        try {
            const client = prisma || this._prisma

            const { externalId } = dto

            const { id } = await client.taskUser.create({
                data: { externalId },
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

            const { externalId } = dto

            const { id: deletedId } = await client.taskUser.update({
                where: {
                    externalId_isDeleted: {
                        externalId,
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
}
