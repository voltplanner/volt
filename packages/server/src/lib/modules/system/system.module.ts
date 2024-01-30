import { DynamicModule, Module, Provider } from '@nestjs/common'

import {
    patchSystemConfig,
    SYSTEM_CONFIG,
    SYSTEM_OPTIONS_TYPE,
    SystemConfigurableModuleClass,
} from './system.config'

@Module({})
export class SystemModule extends SystemConfigurableModuleClass {
    static forRoot(options: typeof SYSTEM_OPTIONS_TYPE): DynamicModule {
        const providers: Provider[] = [
            {
                provide: SYSTEM_CONFIG,
                useValue: patchSystemConfig(options),
            },
        ]

        return {
            module: SystemModule,
            providers,
            exports: [],
        }
    }
}
