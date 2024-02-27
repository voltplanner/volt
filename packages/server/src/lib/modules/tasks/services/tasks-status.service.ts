import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma";

@Injectable()
export class TasksStatusService {
    constructor(
        private readonly _prisma: PrismaService,
    ) {}

    async create(dto: {
        name: string
        code: string
        projectId: string
    }): Promise<string> {
        const { name, code, projectId } = dto

        const result = await this._prisma.taskStatus.create({
            data: {
                code,
                name,
                projectId,
            },
        })

        return result.id
    }
}
