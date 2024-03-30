import { DefaultError } from "../../errors/default.error"
import { UnexpectedError } from "../../errors/unexpected.error"
import { PrismaService } from "../prisma.service"
import { TaskUserPermissionCreateRepositoryDto, TaskUserPermissionDeleteRepositoryDto, TaskUserPermissionUpdateRepositoryDto } from "../repositories-dto/task-user-permission.repository-dto"
import { PrismaTransactionClientType } from "../types/prisma-transaction-client.type"

export const taskUserPermissionModelExtentions = {
    async extCreate(
        dto: TaskUserPermissionCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { roleId, actionId, isAllowed } = dto

            const { id } = await client.taskUserPermission.create({
                data: {
                    roleId,
                    actionId,
                    isAllowed,
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
        dto: TaskUserPermissionUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { id, isAllowed } = dto

            const { id: updatedId } = await client.taskUserPermission.update({
                where: { id },
                data: {
                    isAllowed,
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
        dto: TaskUserPermissionDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { id } = dto

            const { id: deletedId } = await client.taskUserPermission.update({
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

    async extGetPermissionByUserAndAction(
        dto: {
            externalUserId: string
            actionCode: string
        },
        prisma?: any,
    ): Promise<Awaited<ReturnType<typeof PrismaService.instance.taskUserPermission.findFirstOrThrow>>> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { externalUserId, actionCode } = dto

            const permission = await client.taskUserPermission.findFirstOrThrow({
                where: {
                    action: {
                        code: actionCode,
                    },
                    role: {
                        users: {
                            some: {
                                externalId: externalUserId
                            },
                        },
                    },
                    isDeleted: false,
                },
            })

            return permission
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
