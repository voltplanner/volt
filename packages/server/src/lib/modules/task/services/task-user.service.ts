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
        private readonly prisma: PrismaServiceWithExtentionsType,
    ) {}

    async upsert(
        dto: {
            readonly userId: string
            readonly roleCode: string
            readonly projectId: string
        },
        prisma?: PrismaTransactionClientType,
    ): Promise<string> {
        const { userId, roleCode, projectId } = dto

        const client = prisma || this.prisma

        const role = await client.taskUserRole.extGetOneByCode({
            code: roleCode,
            projectId,
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

        const client = prisma || this.prisma

        return await client.taskUser.extFindAll(
            {
                projectId,
            },
            client,
        )
    }
}
