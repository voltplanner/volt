import { DefaultError } from "../../errors/default.error"
import { UnexpectedError } from "../../errors/unexpected.error"
import { TPaginatedMeta } from "../../types/paginated-meta.type"
import { parseMetaArgs } from "../../utils"
import { Prisma } from ".."
import { PrismaService } from "../prisma.service"
import { TaskCustomFieldTypeCreateRepositoryDto, TaskCustomFieldTypeDeleteRepositoryDto, TaskCustomFieldTypeFindManyRepositoryDto, TaskCustomFieldTypeUpdateRepositoryDto } from "../repositories-dto/task-custom-field-type.repository-dto"
import { PrismaTransactionClientType } from "../types/prisma-transaction-client.type"

export const taskCustomFieldTypeModelExtentions = {
    async extCreate(
        dto: TaskCustomFieldTypeCreateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const {
                code,
                name,
                projectId,
                valueTypeId,
                isEditable,
                isRequired,
                isSearchable,
                isFilterable,
                possibleValues,
                defaultValue,
                regexp,
            } = dto

            const { _max: { position: maxPosition } } = await client.taskCustomFieldType.aggregate({
                _max: { position: true },
            })

            // TODO: What to do if someone add a new required field and we already have existed tasks? Ask for default value for existed tasks?
            const { id } = await client.taskCustomFieldType.create({
                data: {
                    code,
                    name,
                    projectId,
                    valueTypeId,
                    isEditable,
                    isRequired,
                    isSearchable,
                    isFilterable,
                    possibleValues,
                    defaultValue,
                    regexp,
                    position: typeof maxPosition === 'number' ? maxPosition + 1 : 0,
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
        dto: TaskCustomFieldTypeUpdateRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const {
                id,
                code,
                name,
                isEditable,
                isRequired,
                isSearchable,
                isFilterable,
                possibleValues,
                defaultValue,
                regexp,
                position: newPosition,
            } = dto

            // We must shift positions of entities between old and new position of status
            if (typeof newPosition === 'number') {
                const { position: oldPosition } =
                    await client.taskCustomFieldType.findUniqueOrThrow({
                        where: { id },
                        select: { position: true },
                    })

                // We need to temporary remove record from position flow, for satisfy position unique index
                // Maybe remove unique and just make it serial in db?
                await client.taskCustomFieldType.update({
                    where: { id },
                    data: { position: -1 },
                })

                if (newPosition > oldPosition) {
                    await client.taskCustomFieldType.updateMany({
                        where: {
                            position: { gt: oldPosition, lte: newPosition },
                        },
                        data: {
                            position: { decrement: 1 },
                        },
                    })
                }

                if (newPosition < oldPosition) {
                    await client.taskCustomFieldType.updateMany({
                        where: {
                            position: { gte: newPosition, lt: oldPosition },
                        },
                        data: {
                            position: { increment: 1 },
                        },
                    })
                }
            }

            // TODO: What to do if someone make field required and not all tasks has this field filled?
            const { id: updatedId } = await client.taskCustomFieldType.update({
                where: { id },
                data: {
                    code,
                    name,
                    isEditable,
                    isRequired,
                    isSearchable,
                    isFilterable,
                    possibleValues,
                    defaultValue,
                    regexp,
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
        dto: TaskCustomFieldTypeDeleteRepositoryDto,
        prisma?: any,
    ): Promise<string> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { id } = dto

            const { id: deletedId } = await client.taskCustomFieldType.update({
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
        dto: TaskCustomFieldTypeFindManyRepositoryDto = {},
        prisma?: any,
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.taskCustomFieldType.findMany>>
        meta: TPaginatedMeta
    }> {
        try {
            const client: PrismaTransactionClientType = prisma || PrismaService.instance

            const { curPage, perPage, take, skip } = parseMetaArgs({
                curPage: dto.curPage,
                perPage: dto.perPage,
            })

            const delegateWhere: Prisma.TaskCustomFieldTypeWhereInput = {
                name: undefined,
                isDeleted: false,
            }

            const delegateOrderBy: Prisma.TaskCustomFieldTypeOrderByWithRelationAndSearchRelevanceInput =
                dto.orderBy
                    ? { [dto.orderBy.field]: dto.orderBy.order }
                    : { position: 'asc' }

            if (dto.filterByName) {
                delegateWhere.name = {
                    contains: dto.filterByName,
                    mode: 'insensitive',
                }
            }

            const count = await client.taskCustomFieldType.count({
                where: delegateWhere,
            })

            const data = await client.taskCustomFieldType.findMany({
                where: delegateWhere,
                orderBy: delegateOrderBy,
                take,
                skip,
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
}
