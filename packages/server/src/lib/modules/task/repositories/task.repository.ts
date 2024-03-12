import { Injectable } from '@nestjs/common'

import { DefaultError } from '../../../shared/errors/default.error'
import { UnexpectedError } from '../../../shared/errors/unexpected.error'
import { Prisma, PrismaService, PrismaTransactionClientType } from '../../../shared/prisma'
import { TPaginatedMeta } from '../../../shared/types/paginated-meta.type'
import { parseMetaArgs } from '../../../shared/utils'
import { TaskCreateRepositoryDto, TaskDeleteRepositoryDto, TaskFindManyRepositoryDto, TaskFindOneRepositoryDto, TaskFindSubtasksRepositoryDto, TaskUpdateRepositoryDto } from '../repositories-dto/task.repository-dto'

// https://mikehillyer.com/articles/managing-hierarchical-data-in-mysql/
// https://postgres.men/database/postgresql/nested-sets-introduction/
// https://postgres.men/database/trees/nested-sets-rules/
// https://postgres.men/database/trees/nested-sets-manage/
// https://www.waitingforcode.com/mysql/managing-hierarchical-data-in-mysql-nested-set/read
// https://www.werc.cz/blog/2015/07/19/nested-set-model-practical-examples-part-i
// data:image/png;base64,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

// -------------------------------------
// https://ru.stackoverflow.com/a/642436
// -------------------------------------

@Injectable()
export class TaskRepository {
    constructor(private readonly _prisma: PrismaService) {}

    async create(
        dto: TaskCreateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const {
                name,
                description,
                estimatedDateEnd,
                estimatedDateStart,
                estimatedDuration,

                typeId,
                statusId,
                projectId,
                createdById,

                parentId,
                assignedToId,
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

                    typeId,
                    statusId,
                    projectId,
                    createdById,

                    parentId,
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
    }

    // Nested Set Notes:
    // Method moves the node and all its children to the new parent if parentId is specified
    async update(
        dto: TaskUpdateRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

            const {
                id,

                name,
                description,
                estimatedDateEnd,
                estimatedDateStart,
                estimatedDuration,

                typeId,
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

                // Count of keys to replase (one node has 2 keys, left key and right key)
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
                    parent.rgt > task.rgt ? parent.rgt - keysToMoveCount : parent.rgt

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
                const pd = parent.rgt > task.rgt
                    ? parent.rgt - task.rgt - 1
                    : parent.rgt - task.rgt - 1 + keysToMoveCount

                const dl = parent.level + 1 - task.level

                await client.$queryRawUnsafe(
                    `UPDATE task SET lft = ${pd} - lft, rgt = ${pd} - rgt, level = level + ${dl} WHERE lft <= 0 - ${task.lft} AND rgt >= 0 - ${task.rgt};`,
                )
            }

            // Set new parent to replaced tree root task
            await client.task.update({
                where: { id },
                data: {
                    name,
                    description,
                    estimatedDateEnd,
                    estimatedDateStart,
                    estimatedDuration,

                    typeId,
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
    }

    // Nested Set Notes:
    // Method deletes node, but retains children. If deleted node had parent, then all closest children of the deleted node will become its children.
    async delete(
        dto: TaskDeleteRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        try {
            const client = prisma || this._prisma

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
    }

    async findMany(
        dto: TaskFindManyRepositoryDto = {},
        prisma?: PrismaTransactionClientType,
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.task.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client = prisma || this._prisma

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskWhereInput = {
                name: undefined,
                number: undefined,
                typeId: undefined,
                statusId: undefined,
                parentId: undefined,
                projectId: undefined,
                createdById: undefined,
                assignedToId: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskOrderByWithRelationAndSearchRelevanceInput = { createdAt: 'desc' }


            if (dto.filterByName) {
                delegateWhere.name = {
                    contains: dto.filterByName,
                    mode: 'insensitive'
                }
            }

            if (dto.filterByNumber) {
                delegateWhere.number = dto.filterByNumber
            }

            if (dto.filterByTypeId) {
                delegateWhere.typeId = dto.filterByTypeId
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
    }

    async findOne(
        dto: TaskFindOneRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<Awaited<ReturnType<typeof PrismaService.instance.task.findFirst>>> {
        try {
            const client = prisma || this._prisma

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
    }

    // TODO: Limit depth and subtasks count. Implement method for query next subtasks.
    async findSubtasks(
        dto: TaskFindSubtasksRepositoryDto,
        prisma?: PrismaTransactionClientType,
    ): Promise<Awaited<ReturnType<typeof PrismaService.instance.task.findMany>>> {
        try {
            const client = prisma || this._prisma

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
    }
}
