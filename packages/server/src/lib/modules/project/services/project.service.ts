import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma";

@Injectable()
export class ProjectService {
    constructor(
        private readonly _prisma: PrismaService,
    ) {}

    async create(dto: {
        name: string
        userId: string
        statusId: string
    }): Promise<string> {
        const { name, statusId, userId: createdById } = dto

        const maxNumber = await this._prisma.project.aggregate({
            _max: { number: true },
        })

        const { id } = await this._prisma.project.create({
            data: {
                name,
                statusId,
                createdById,
                number: maxNumber._max.number || 0,
            },
            select: { id: true },
        })

        return id
    }
}
