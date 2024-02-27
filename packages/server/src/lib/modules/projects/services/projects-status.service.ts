import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma";

@Injectable()
export class ProjectsStatusService {
    constructor(
        private readonly _prisma: PrismaService,
    ) {}

    async findMany(): Promise<Awaited<ReturnType<typeof this._prisma.projectStatus.findMany>>> {
        return await this._prisma.projectStatus.findMany()
    }

    async create(dto: {
        name: string
        code: string
    }): Promise<string> {
        const { name, code } = dto

        const { id } = await this._prisma.projectStatus.create({
            data: {
                code,
                name,
            },
            select: {
                id: true,
            },
        })

        return id
    }

    async update(dto: {
        id: string
        name?: string
        code?: string
    }): Promise<string> {
        const { id, name, code } = dto

        await this._prisma.projectStatus.update({
            where: {
                id,
            },
            data: {
                code,
                name,
            },
        })

        return id
    }

    async delete(dto: {
        id: string
    }): Promise<string> {
        const { id } = dto

        await this._prisma.projectStatus.delete({
            where: {
                id,
            },
        })

        return id
    }
}
