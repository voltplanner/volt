import { Injectable } from "@nestjs/common";

import { PrismaServiceWithExtentionsType, PrismaTransactionClientType } from "../../../shared/prisma";

@Injectable()
export class TaskService {
    constructor(
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    async taskCreate(dto: {
        readonly name: string
        readonly description?: string
        readonly estimatedDateEnd?: Date
        readonly estimatedDateStart?: Date
        readonly estimatedDuration?: number

        readonly statusId: string
        readonly projectId: string
        readonly createdById: string

        readonly parentId?: string
        readonly assignedToId?: string
        readonly tagsIds?: string[]
    }, prisma?: PrismaTransactionClientType) {
        const client = prisma || this._prismaService

        const projectId = await client.task.extCreate(dto, client)

        return projectId
    }

    /**
     * If `isDefault` is true, than it will replace current default status.
     */
    async statusUpsert(dto: {
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

    async statusFindAll(dto: {
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskStatus.extFindMany({
            projectId,
        }, client)
    }

    /**
     * New default status will replace the current.
     */
    async statusSetDefault(dto: {
        readonly id: string
    }, prisma?: PrismaTransactionClientType) {
        const { id } = dto

        const client = prisma || this._prismaService

        await client.taskStatus.extSetDefault({
            id,
        }, client)

        return id
    }

    async tagUpsert(dto: {
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

    async tagFindAll(dto: {
        readonly projectId: string
    }, prisma?: PrismaTransactionClientType) {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskTag.extFindMany({
            projectId,
        }, client)
    }

    async relationUpsert(dto: {
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

    async customFieldValueTypeUpsert(dto: {
        readonly code: string
        readonly name: string
    }, prisma?: PrismaTransactionClientType) {
        const { code, name } = dto

        const client = prisma || this._prismaService

        const id = await client.taskCustomFieldValueType.extUpsert({
            code,
            name,
        }, client)

        return id
    }
}
