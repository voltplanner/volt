import { DynamicModule, Module, Provider } from '@nestjs/common'

import {
    patchPrismaConfig,
    PRISMA_CONFIG,
    PRISMA_OPTIONS_TYPE,
    PrismaConfig,
    PrismaConfigurableModuleClass,
} from './prisma.config'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
} from './prisma.service'

@Module({})
export class PrismaModule extends PrismaConfigurableModuleClass {
    static forRoot(options: typeof PRISMA_OPTIONS_TYPE): DynamicModule {
        const providers: Provider[] = [
            PrismaService.instance
                ? {
                      provide: PrismaService,
                      useValue: PrismaService.instance,
                  }
                : {
                      provide: PrismaService,
                      useFactory: (
                          config: PrismaConfig,
                      ): PrismaServiceWithExtentionsType => {
                          return new PrismaService(config).withExtensions()
                      },
                      inject: [PRISMA_CONFIG],
                  },
            {
                provide: PRISMA_CONFIG,
                useValue: patchPrismaConfig(options),
            },
        ]

        return {
            global: true,
            module: PrismaModule,
            providers,
            exports: [PrismaService],
        }
    }
}
