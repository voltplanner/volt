import {
    Inject,
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from 'generatedprisma'

import { Prisma } from '.'
import { PRISMA_CONFIG, PrismaConfig } from './prisma.config'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    public static instance: PrismaService

    private logger = new Logger(PrismaService.name)

    constructor(
        @Inject(PRISMA_CONFIG)
        private readonly config: PrismaConfig,
    ) {
        super({
            datasources: {
                db: {
                    url: config.url,
                },
            },
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
                {
                    emit: 'event',
                    level: 'error',
                },
            ],
        })
        PrismaService.instance = this
    }

    private _getClientModelName<T extends Prisma.ModelName>(
        modelName: T,
    ): Uncapitalize<T> {
        return (modelName.charAt(0).toLowerCase() +
            modelName.slice(1)) as Uncapitalize<T>
    }

    private _isModelHasSomeFields(
        modelName: Prisma.ModelName,
        fieldNames: string[],
    ): boolean {
        const clientModelName = this._getClientModelName(modelName)

        return fieldNames.some((i) => i in this[clientModelName].fields)
    }

    async onModuleInit(): Promise<void> {
        const { logging, maxQueryExecutionTime } = this.config

        // this.$extends({
        //     query: {
        //         $allModels: {
        //             // ----------------------------------------------------
        //             // SOFT DELETE EXTENTION
        //             // ----------------------------------------------------
        //             async delete({ model, args, query }) {
        //                 if (PrismaService.instance._isModelHasSomeFields(model, ['isDeleted', 'is_deleted'])) {
        //                     const clientModelName = PrismaService.instance._getClientModelName(model)

        //                     return await PrismaService.instance[clientModelName].update({
        //                         ...args,
        //                         data: { isDeleted: true },
        //                     })
        //                 }

        //                 return await query(args)
        //             },
        //             // ----------------------------------------------------
        //             // SOFT DELETE EXTENTION
        //             // ----------------------------------------------------
        //             async deleteMany({ model, args, query }) {
        //                 if (PrismaService.instance._isModelHasSomeFields(model, ['isDeleted', 'is_deleted'])) {
        //                     const clientModelName = PrismaService.instance._getClientModelName(model)

        //                     return await PrismaService.instance[clientModelName].updateMany({
        //                         ...args,
        //                         data: { isDeleted: true },
        //                     })
        //                 }

        //                 return await query(args)
        //             },
        //         }
        //     }
        // })

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-extra-semi
            ;(this as any).$on('query', (e: any) => {
                if (logging === 'all_queries') {
                    if (e.query !== 'SELECT 1') {
                        this.logger.log(
                            `query: ${e.query}, params: ${e.params}, duration: ${e.duration}`,
                        )
                    }
                }
                if (logging === 'long_queries') {
                    if (
                        maxQueryExecutionTime &&
                        e.duration >= maxQueryExecutionTime
                    ) {
                        this.logger.warn(
                            `query is slow: ${e.query}, params: ${e.params}, execution time: ${e.duration}`,
                        )
                    }
                }
            })
            await this.$connect()
            setInterval(
                () =>
                    this.$queryRaw`SELECT 1`.catch((err) =>
                        this.logger.error(err, err.stack),
                    ),
                5 * 60000,
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (!String(err).includes('fake')) {
                this.logger.error(err, err.stack)
            }
            this.$disconnect()
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect()
    }
}
