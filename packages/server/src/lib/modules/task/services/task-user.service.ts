import { Inject, Injectable } from '@nestjs/common'

import {
    PrismaService,
    PrismaServiceWithExtentionsType,
    PrismaTransactionClientType,
} from '../../../shared/prisma'

@Injectable()
export class TaskUserService {
    constructor(
        @Inject(PrismaService)
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    async upsert(
        dto: {
            readonly userId: string
            readonly roleCode: string
        },
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        const { userId, roleCode } = dto

        const client = prisma || this._prismaService

        const role = await client.taskUserRole.extGetOneByCode({
            code: roleCode,
        })

        const id = await client.taskUser.extUpsert(
            {
                id: userId,
                roleId: role.id,
            },
            client,
        )

        return id
    }

    async findAll(
        dto: {
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ): Promise<string[]> {
        const { projectId } = dto

        const client = prisma || this._prismaService

        return await client.taskUser.extFindAll(
            {
                projectId,
            },
            client,
        )
    }
}
