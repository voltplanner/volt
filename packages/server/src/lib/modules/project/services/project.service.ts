import { Injectable } from '@nestjs/common'

import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'
import { Prisma, PrismaService } from '../../../shared/prisma'
import { parseMetaArgs } from '../../../shared/utils'
import { ProjectDeleteContainsTasksError } from '../errors/project-delete-contains-tasks.error'

@Injectable()
export class ProjectService {
    constructor(private readonly _prisma: PrismaService) {}

    async create(dto: {
        name: string
        userId: string
        statusId: string
        description: string
    }): Promise<string> {
        const { name, statusId, description, userId: createdById } = dto

        const { id } = await this._prisma.project.create({
            data: {
                name,
                statusId,
                createdById,
                description,
            },
            select: { id: true },
        })

        return id
    }

    async updateOne(dto: {
        id: string
        name?: string
        statusId?: string
        description?: string | null
    }): Promise<string> {
        const { id, name, statusId, description } = dto

        const { id: updatedId } = await this._prisma.project.update({
            where: { id },
            data: {
                name,
                statusId,
                description,
            },
            select: { id: true },
        })

        return updatedId
    }

    async deleteOne(dto: { id: string }): Promise<string> {
        const { id } = dto

        const ormEntity =
            await this._prisma.project.findUniqueOrThrow({
                where: { id },
                include: { tasks: true },
            })

        if (ormEntity.tasks.length) {
            throw new ProjectDeleteContainsTasksError()
        }

        const { id: deletedId } = await this._prisma.project.update({
            where: { id },
            data: {
                isDeleted: true,
            },
            select: { id: true },
        })

        return deletedId
    }

    async findMany(
        dto: {
            curPage?: number
            perPage?: number

            filterByName?: string
            filterByStatus?: string
            filterByCreatedAt?: {
                from?: Date
                to?: Date
            }

            orderBy?: {
                field: 'name' | 'status' | 'createdAt'
                order: OrderEnum
            }
        } = {},
    ): Promise<{
        data: Awaited<ReturnType<typeof PrismaService.instance.project.findMany>>
        meta: {
            curPage: number
            perPage: number
            total: number
        }
    }> {
        const { curPage, perPage, take, skip } = parseMetaArgs({
            curPage: dto.curPage,
            perPage: dto.perPage,
        })

        const delegateWhere: Prisma.ProjectWhereInput = {
            name: undefined,
            status: undefined,
            createdAt: undefined,
            isDeleted: false,
        }

        const delegateOrderBy: Prisma.ProjectOrderByWithRelationAndSearchRelevanceInput =
            dto.orderBy
                ? { [dto.orderBy.field]: dto.orderBy.order }
                : { createdAt: 'desc' }

        if (dto.filterByName) {
            delegateWhere.name = {
                contains: dto.filterByName,
                mode: 'insensitive',
            }
        }

        if (dto.filterByStatus) {
            delegateWhere.statusId = dto.filterByStatus
        }

        if (dto.filterByCreatedAt?.from || dto.filterByCreatedAt?.to) {
            delegateWhere.createdAt = {
                gte: dto.filterByCreatedAt?.from ?? undefined,
                lte: dto.filterByCreatedAt?.to ?? undefined,
            }
        }

        const count = await this._prisma.project.count({
            where: delegateWhere,
        })

        const data = await this._prisma.project.findMany({
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
    }
}
