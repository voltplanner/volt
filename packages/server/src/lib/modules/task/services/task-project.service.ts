import { Injectable } from "@nestjs/common";

import { PrismaServiceWithExtentionsType, PrismaTransactionClientType } from "../../../shared/prisma";

@Injectable()
export class TaskProjectService {
    constructor(
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    async projectCreate(dto: {
        readonly name: string
        readonly budget?: number
        readonly deadline?: Date
        readonly description?: string
    }, prisma?: PrismaTransactionClientType) {
        const { name, budget, deadline, description } = dto

        const client = prisma || this._prismaService

        const projectId = await client.taskProject.extCreate({
            name,
            budget,
            deadline,
            description,
        }, client)

        return projectId
    }

    async projectAddUsers(dto: {
        readonly projectId: string
        readonly userIds: string[]
    }, prisma?: PrismaTransactionClientType) {
        const { projectId, userIds } = dto

        const client = prisma || this._prismaService

        if (userIds.length) {
            await client.taskProject.extConnectUsers({
                projectId,
                userIds,
            }, client)
        }
    }
}
