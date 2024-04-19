import { DefaultError } from '../../errors/default.error'
import { UnexpectedError } from '../../errors/unexpected.error'
import { TPaginatedMeta } from '../../types/paginated-meta.type'
import { parseMetaArgs } from '../../utils'
import { Prisma, Task, TaskProject, TaskStatus } from '..'
import { PrismaService } from '../prisma.service'
import {
    TaskCreateRepositoryDto,
    TaskDeleteRepositoryDto,
    TaskFindManyRepositoryDto,
    TaskFindOneRepositoryDto,
    TaskFindSubtasksRepositoryDto,
    TaskUpdateRepositoryDto,
} from '../repositories-dto/task.repository-dto'
import { PrismaTransactionClientType } from '../types/prisma-transaction-client.type'

export const taskModelExtentions = {
    async extCreate(
        dto: TaskCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const {
                name,
                description,
                estimatedDateEnd,
                estimatedDateStart,
                estimatedDuration,

                statusId,
                projectId,
                createdById,

                parentId,
                assignedToId,
                tagsIds,
            } = dto

            // Default values, if we have empty DB
            let newLevel = 1
            let newLft: number

            // If task is subtask, then we need to take parent right key as left key for new task. And label will be 1 highter then the parent.
            // If not, then we haven't parent and must take the highter right key presented in table (to place new task next to latest) or 1 if it is our first record.
            if (parentId) {
                const parent = await client.task.findUniqueOrThrow({
                    where: { id: parentId },
                })

                newLevel = parent.level + 1
                newLft = parent.rgt
            } else {
                const result = await client.task.aggregate({
                    _max: { rgt: true },
                })

                newLft = result._max.rgt ? result._max.rgt + 1 : 0
            }

            // For parent/highter nodes we increase right key by appended nodes count * 2. But we always create only one node at same time, without childrens, so we can just increment by 2.
            await client.task.updateMany({
                data: {
                    rgt: { increment: 2 },
                },
                where: {
                    rgt: { gte: newLft },
                },
            })

            // For highter nodes we must to increase left key as the right key.
            await client.task.updateMany({
                data: {
                    lft: { increment: 2 },
                },
                where: {
                    lft: { gt: newLft },
                },
            })

            const { id } = await client.task.create({
                data: {
                    lft: newLft,
                    rgt: newLft + 1,
                    level: newLevel,

                    name,
                    description,
                    estimatedDateEnd,
                    estimatedDateStart,
                    estimatedDuration,
                    version: 0,

                    statusId,
                    projectId,
                    createdById,

                    parentId,
                    assignedToId,
                },
            })

            if (tagsIds?.length) {
                await client.taskOnTaskTag.createMany({
                    data: tagsIds.map((taskTagId) => ({
                        taskId: id,
                        taskTagId,
                    })),
                })
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

    // Nested Set Notes:
    // Method moves the node and all its children to the new parent if parentId is specified
    async extUpdate(
        dto: TaskUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const {
                id,
                version,

                name,
                description,
                estimatedDateEnd,
                estimatedDateStart,
                estimatedDuration,

                parentId,
                statusId,
                assignedToId,
            } = dto

            if (parentId) {
                const parent = await client.task.findUniqueOrThrow({
                    where: { id: parentId },
                })

                const task = await client.task.findUniqueOrThrow({
                    where: { id },
                })

                // Count of keys to replace (one node has 2 keys, left key and right key)
                const keysToMoveCount = task.rgt - task.lft + 1

                // Hide replaced tree. Set negative keys to tree whitch we want to replace.
                await client.$queryRawUnsafe(
                    `UPDATE task SET lft = 0 - lft, rgt = 0 - rgt WHERE lft >= ${task.lft} AND rgt <= ${task.rgt};`,
                )

                // Collapse place from where we cut the replaced tree
                await client.task.updateMany({
                    data: {
                        lft: { decrement: keysToMoveCount },
                    },
                    where: {
                        lft: { gt: task.rgt },
                    },
                })
                await client.task.updateMany({
                    data: {
                        rgt: { decrement: keysToMoveCount },
                    },
                    where: {
                        rgt: { gt: task.rgt },
                    },
                })

                // Define expand size
                const pr =
                    parent.rgt > task.rgt
                        ? parent.rgt - keysToMoveCount
                        : parent.rgt

                // Expand place for the replaced tree
                await client.task.updateMany({
                    data: {
                        lft: { increment: keysToMoveCount },
                    },
                    where: {
                        lft: { gte: pr },
                    },
                })
                await client.task.updateMany({
                    data: {
                        rgt: { increment: keysToMoveCount },
                    },
                    where: {
                        rgt: { gte: pr },
                    },
                })

                // Paste replaced tree
                const pd =
                    parent.rgt > task.rgt
                        ? parent.rgt - task.rgt - 1
                        : parent.rgt - task.rgt - 1 + keysToMoveCount

                const dl = parent.level + 1 - task.level

                await client.$queryRawUnsafe(
                    `UPDATE task SET lft = ${pd} - lft, rgt = ${pd} - rgt, level = level + ${dl} WHERE lft <= 0 - ${task.lft} AND rgt >= 0 - ${task.rgt};`,
                )
            }

            // Set new parent to replaced tree root task
            await client.task.update({
                where: { id, version },
                data: {
                    name,
                    description,
                    estimatedDateEnd,
                    estimatedDateStart,
                    estimatedDuration,

                    parentId,
                    statusId,
                    assignedToId,
                },
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

    // Nested Set Notes:
    // Method deletes node, but retains children. If deleted node had parent, then all closest children of the deleted node will become its children.
    async extDelete(
        dto: TaskDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id } = dto

            // Delete task
            const task = await client.task.delete({
                where: { id },
            })

            // Set nested nodes parent to parent of deleted task
            await client.task.updateMany({
                data: {
                    parentId: task.parentId,
                },
                where: {
                    lft: { gt: task.lft },
                    rgt: { lt: task.rgt },
                    level: task.level + 1,
                },
            })

            // For child nodes - we need to decrease both keys by 1. Becouse only one parent was removed and we want keep childs
            await client.task.updateMany({
                data: {
                    lft: { decrement: 1 },
                    rgt: { decrement: 1 },
                },
                where: {
                    lft: { gt: task.lft },
                    rgt: { lt: task.rgt },
                },
            })

            // For higher nodes (right trees) - we need to decrease both keys by 2. Because all right trees are shift to the place of the old (left) tree
            await client.task.updateMany({
                data: {
                    lft: { decrement: 2 },
                    rgt: { decrement: 2 },
                },
                where: {
                    rgt: { gt: task.rgt },
                    lft: { gt: task.rgt },
                },
            })

            // For parent nodes - we need to decrease only right key by 2. Because the left side of the tree remains the same
            await client.task.updateMany({
                data: {
                    rgt: { decrement: 2 },
                },
                where: {
                    rgt: { gt: task.rgt },
                    lft: { lt: task.lft },
                },
            })

            return task.id
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
        dto: TaskFindManyRepositoryDto = {},
        prisma?: any,
    ): Promise<{
        data: (Task & { status: Pick<TaskStatus, 'id' | 'code' | 'name'> })[]
        meta: TPaginatedMeta
    }> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskWhereInput = {
                name: undefined,
                number: undefined,
                statusId: undefined,
                parentId: undefined,
                projectId: undefined,
                createdById: undefined,
                assignedToId: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskOrderByWithRelationAndSearchRelevanceInput =
                { createdAt: 'desc' }

            if (dto.filterByName) {
                delegateWhere.name = {
                    contains: dto.filterByName,
                    mode: 'insensitive',
                }
            }

            if (dto.filterByNumber) {
                delegateWhere.number = dto.filterByNumber
            }

            if (dto.filterByStatusId) {
                delegateWhere.statusId = dto.filterByStatusId
            }

            if (dto.filterByParentId) {
                delegateWhere.parentId = dto.filterByParentId
            }

            if (dto.filterByProjectId) {
                delegateWhere.projectId = dto.filterByProjectId
            }

            if (dto.filterByCreatedById) {
                delegateWhere.createdById = dto.filterByCreatedById
            }

            if (dto.filterByAssignedToId) {
                delegateWhere.assignedToId = dto.filterByAssignedToId
            }

            if (dto.filterByCreatedAt?.from || dto.filterByCreatedAt?.to) {
                delegateWhere.createdAt = {
                    gte: dto.filterByCreatedAt?.from ?? undefined,
                    lte: dto.filterByCreatedAt?.to ?? undefined,
                }
            }

            const count = await client.task.count({
                where: delegateWhere,
            })

            const data = await client.task.findMany({
                where: delegateWhere,
                orderBy: delegateOrderBy,
                skip,
                take,
                include: {
                    status: {
                        select: {
                            id: true,
                            code: true,
                            name: true,
                        },
                    },
                },
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

    async extFindOne(
        dto: TaskFindOneRepositoryDto,
        prisma?: any,
    ): Promise<
        Awaited<ReturnType<typeof PrismaService.instance.task.findFirst>>
    > {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { id } = dto

            const task = await client.task.findFirst({
                where: { id },
            })

            return task
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

    // TODO: Limit depth and subtasks count. Implement method for query next subtasks.
    async extFindSubtasks(
        dto: TaskFindSubtasksRepositoryDto,
        prisma?: any,
    ): Promise<
        Awaited<ReturnType<typeof PrismaService.instance.task.findMany>>
    > {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { parentId } = dto

            const parent = await client.task.findUniqueOrThrow({
                where: { id: parentId },
            })

            const data = await client.task.findMany({
                where: {
                    lft: { gt: parent.lft },
                    rgt: { lt: parent.rgt },
                },
                orderBy: {
                    createdAt: 'desc',
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

    async extSetTags(
        dto: { taskId: string; taskTagIds: string[] },
        prisma?: any,
    ): Promise<void> {
        try {
            const client: PrismaTransactionClientType =
                prisma || PrismaService.instance

            const { taskId, taskTagIds } = dto

            await client.taskOnTaskTag.deleteMany({
                where: { taskId },
            })

            await client.taskOnTaskTag.createMany({
                data: taskTagIds.map((i) => ({
                    taskId,
                    taskTagId: i,
                })),
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