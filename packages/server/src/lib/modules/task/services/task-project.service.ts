import { Injectable } from "@nestjs/common";

import { PrismaServiceWithExtentionsType } from "../../../shared/prisma";

@Injectable()
export class TaskProjectService {
    constructor(
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    async createProject(dto: {
        readonly name: string
        readonly description: string
        readonly externalUserId: string
    }) {
        const { name, description, externalUserId } = dto

        return await this._prismaService.$transaction(async (client) => {
            const internalUserId = await this._prismaService.taskUser.extUpsert({
                userId: externalUserId,
            }, client)

            const defaultProjectStatus = await this._prismaService.taskProjectStatus.extGetDefault(
                client,
            )

            const projectId = await this._prismaService.taskProject.extCreate({
                name,
                description,
                internalUserId,
                statusId: defaultProjectStatus.id,
            }, client)

            await this._prismaService.taskProject.extConnectUser({
                internalUserId,
                projectId,
            }, client)

            return projectId
        })
    }
}
