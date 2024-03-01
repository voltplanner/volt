import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../shared/prisma";
import { ProjectStatusDeleteInUseError } from "../errors/project-status-delete-in-use.error";

@Injectable()
export class ProjectStatusService {
    constructor(
        private readonly _prisma: PrismaService,
    ) {}

    async createOne(dto: {
        name: string
        code: string
        description: string
    }): Promise<string> {
        const { name, code, description } = dto

        const { _max: { position: maxPosition } } = await this._prisma.projectStatus.aggregate({
            _max: { position: true },
        })

        const { id } = await this._prisma.projectStatus.create({
            data: {
                code,
                name,
                description,
                position: maxPosition || 0,
            },
            select: { id: true },
        })

        return id
    }

    async updateOne(dto: {
        id: string
        name?: string
        code?: string
        position?: number
        description?: string | null
    }): Promise<string> {
        const { id, name, code, description, position: newPosition } = dto

        // We must shift positions of entities between old and new position of status
        if (newPosition) {
            const { position: oldPosition } = await this._prisma.projectStatus.findUniqueOrThrow({
                where: { id },
                select: { position: true },
            })

            if (newPosition > oldPosition) {
                await this._prisma.projectStatus.updateMany({
                    where: {
                        position: { gt: oldPosition, lte: newPosition },
                    },
                    data: {
                        position: { decrement: 1 },
                    },
                })
            }

            if (newPosition < oldPosition) {
                await this._prisma.projectStatus.updateMany({
                    where: {
                        position: { gte: newPosition, lt: oldPosition },
                    },
                    data: {
                        position: { increment: 1 },
                    },
                })
            }
        }

        const { id: updatedId } = await this._prisma.projectStatus.update({
            where: { id },
            data: {
                code,
                name,
                description,
                position: newPosition,
            },
            select: { id: true },
        })

        return updatedId
    }

    async deleteOne(dto: {
        id: string
    }): Promise<string> {
        const { id } = dto

        const statusOrmEntity = await this._prisma.projectStatus.findUnique({
            where: { id },
            include: { projects: true },
        })

        if (statusOrmEntity.projects.length) {
            throw new ProjectStatusDeleteInUseError({
                usedByProjects: statusOrmEntity.projects.map(i => i.name),
            })
        }

        const { id: deletedId } = await this._prisma.projectStatus.update({
            where: { id },
            data: { isDeleted: true },
            select: { id: true },
        })

        return deletedId
    }

    async findMany(): Promise<Awaited<ReturnType<typeof this._prisma.projectStatus.findMany>>> {
        return await this._prisma.projectStatus.findMany()
    }
}
