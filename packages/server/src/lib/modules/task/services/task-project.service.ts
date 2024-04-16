import { Inject, Injectable } from "@nestjs/common";

import { PrismaServiceWithExtentionsType, PrismaTransactionClientType } from "../../../shared/prisma";
import { TaskConfig } from "../task.config";

@Injectable()
export class TaskProjectService {
    constructor(
        private readonly _prismaService: PrismaServiceWithExtentionsType,

        @Inject(TaskConfig)
        private readonly _taskConfig: TaskConfig,
    ) {}

    async projectFindMany(dto?: {
        userId?: string
    }) {
        const { userId } = dto || {}

        return await this._prismaService.taskProject.extFindMany({
            filterByUserId: userId,
        })
    }

    async projectUpdate(dto: {
        readonly id: string
        readonly version: number
        readonly name?: string
        readonly budget?: number | null
        readonly deadline?: number | null
        readonly description?: string | null
    }, prisma?: PrismaTransactionClientType) {
        const client = prisma || this._prismaService

        return await client.taskProject.extUpdate({
            ...dto,
            deadline: typeof dto.deadline === 'number' ? new Date(dto.deadline) : dto.deadline,
        }, client)
    }

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

        for (const role of this._taskConfig.defaultTaskUserRoles) {
            this._prismaService.taskUserRole.extUpsert

            const roleId = await client.taskUserRole.extUpsert({
                projectId,
                code: role.code,
                name: role.name,
                description: role.description,
            }, client)

            for (const actionCode of getObjectKeys(DEFAULT_USER_ACTIONS)) {
                const action = DEFAULT_USER_ACTIONS[actionCode]

                await this._taskUserService.actionUpsert({
                    roleCode,
                    actionCode,
                    actionName: action.name,
                    actionDescription: action.description,
                    isAllowed: DEFAULT_USER_PERMISSIONS[roleCode][actionCode],
                }, client)
            }
        }

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

    async tasksStatusesUpsert(dto: {
        readonly code: string
        readonly name: string
        readonly description: string
        readonly projectId: string
        readonly isDefault?: boolean
    }, prisma?: PrismaTransactionClientType) {
        const { code, name, description, projectId, isDefault } = dto

        const client = prisma || this._prismaService

        const id = await client.taskStatus.extUpsert({
            code,
            name,
            description,
            projectId,
            isDefault,
        }, client)

        return id
    }

    async tasksStatusesFindAll(dto: {
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskStatus.extFindMany({
            projectId,
        }, client)
    }

    async tasksTagsUpsert(dto: {
        readonly code: string
        readonly name: string
        readonly description: string
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType) {
        const { code, name, description, projectId } = dto

        const client = prisma || this._prismaService

        const id = await client.taskTag.extUpsert({
            code,
            name,
            description,
            projectId,
        }, client)

        return id
    }

    async tasksTagsFindAll(dto: {
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskTag.extFindMany({
            projectId,
        }, client)
    }

    async tasksRelationsUpsert(dto: {
        readonly code: string
        readonly nameMain: string
        readonly nameForeign: string
        readonly description: string
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType) {
        const { code, nameMain, nameForeign, description, projectId } = dto

        const client = prisma || this._prismaService

        const id = await client.taskRelation.extUpsert({
            code,
            nameMain,
            nameForeign,
            description,
            projectId,
        }, client)

        return id
    }

    async tasksRelationsFindAll(dto: {
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskRelation.extFindMany({
            projectId,
        }, client)
    }

    async usersRolesUpsert(dto: {
        readonly code: string
        readonly name: string
        readonly projectId: string
        readonly description: string
    }, prisma?: PrismaTransactionClientType): Promise<string> {
        const { code, name, projectId, description } = dto

        const client = prisma || this._prismaService

        const roleId = await client.taskUserRole.extUpsert({
            code,
            name,
            projectId,
            description,
        }, client)

        return roleId
    }

    async usersRolesFindAll(dto: {
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskUserRole.extFindMany({ projectId })
    }
}
