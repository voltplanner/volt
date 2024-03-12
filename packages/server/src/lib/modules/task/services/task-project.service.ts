import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../shared/prisma";
import { TaskProjectRepository } from "../repositories/task-project.repository";
import { TaskProjectStatusRepository } from "../repositories/task-project-status.repository";
import { TaskUserRepository } from "../repositories/task-user.repository";

@Injectable()
export class TaskProjectService {
    constructor(
        private readonly _prismaService: PrismaService,
        private readonly _taskUserRepository: TaskUserRepository,
        private readonly _taskProjectRepository: TaskProjectRepository,
        private readonly _taskProjectStatusRepository: TaskProjectStatusRepository,
    ) {}

    async createProject(dto: {
        readonly name: string
        readonly description: string
        readonly externalUserId: string
    }) {
        const { name, description, externalUserId } = dto

        return await this._prismaService.$transaction(async (client) => {
            const internalUserId = await this._taskUserRepository.upsert({
                userId: externalUserId,
            }, client)

            const defaultProjectStatus = await this._taskProjectStatusRepository.getDefault(
                client,
            )

            const projectId = await this._taskProjectRepository.create({
                name,
                description,
                internalUserId,
                statusId: defaultProjectStatus.id,
            }, client)

            await this._taskProjectRepository.connectUser({
                internalUserId,
                projectId,
            }, client)

            return projectId
        })
    }
}
