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
            PrismaService.instanceWithExtentions
                ? {
                      provide: PrismaService,
                      useValue: PrismaService.instanceWithExtentions,
                  }
                : {
                      provide: PrismaService,
                      useFactory: (
                          config: PrismaConfig,
                      ): PrismaServiceWithExtentionsType => {
                          new PrismaService(config)

                          return PrismaService.instanceWithExtentions
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
