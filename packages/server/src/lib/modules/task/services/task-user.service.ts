import { Injectable } from "@nestjs/common";

import { PrismaServiceWithExtentionsType, PrismaTransactionClientType } from "../../../shared/prisma";

@Injectable()
export class TaskUserService {
    constructor(
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    async userUpsert(dto: {
        readonly userId: string
        readonly roleCode: string
    }, prisma?: PrismaTransactionClientType): Promise<string> {
        const { userId, roleCode } = dto

        const client = prisma || this._prismaService

        const role = await client.taskUserRole.extGetOneByCode({
            code: roleCode,
        })

        const internalUserId = await client.taskUser.extUpsert({
            id: userId,
            roleId: role.id,
        }, client)

        return internalUserId
    }

    async userFindAll(dto: {
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType): Promise<string[]> {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskUser.extFindAll({
            projectId,
        }, client)
    }

    async actionUpsert(dto: {
        readonly roleCode: string
        readonly actionCode: string
        readonly actionName: string
        readonly actionDescription: string
        readonly isAllowed: boolean
    }, prisma?: PrismaTransactionClientType): Promise<string> {
        const { roleCode, actionCode, actionName, actionDescription, isAllowed } = dto

        const client = prisma || this._prismaService

        const { id: roleId } = await client.taskUserRole.extGetOneByCode({
            code: roleCode,
        })

        const actionId = await client.taskUserAction.extUpsert({
            code: actionCode,
            name: actionName,
            description: actionDescription,
        }, client)

        await client.taskUserPermission.extCreate({
            roleId,
            actionId,
            isAllowed,
        }, client)

        return actionId
    }

    async isUserCanPerformAction(dto: {
        readonly externalUserId: string
        readonly actionCode: string
    }, prisma?: PrismaTransactionClientType): Promise<boolean> {
        const { externalUserId, actionCode } = dto

        const client = prisma || this._prismaService

        const permission = await client.taskUserPermission.extGetPermissionByUserAndAction({
            actionCode,
            externalUserId,
        }, client)

        return permission.isAllowed
    }
}
