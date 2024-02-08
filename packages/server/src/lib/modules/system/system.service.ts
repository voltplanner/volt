import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../shared/prisma'

@Injectable()
export class SystemService {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {
        try {
            await this.prisma.systemSettings.create({})
        } catch (error) {
            // silent error
        }
    }
}
