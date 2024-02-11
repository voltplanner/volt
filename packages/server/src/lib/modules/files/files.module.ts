import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import { DynamicModule, Module, Provider, Type } from '@nestjs/common'

import { FilesController } from './controllers/files.controller'
import {
    FILES_CONFIG,
    FILES_OPTIONS_TYPE,
    FilesConfigurableModuleClass,
    patchFilesConfig,
} from './files.config'
import { FilesResolver } from './resolvers/files.resolver'
import { FilesService } from './services/files.service'

@Module({})
export class FilesModule extends FilesConfigurableModuleClass {
    static forRoot(options: typeof FILES_OPTIONS_TYPE): DynamicModule {
        const imports: any[] = [DiscoveryModule]
        const controllers: Type<any>[] = [FilesController]
        const exports: any[] = [FILES_CONFIG, FilesService]
        const providers: Provider[] = [
            {
                provide: FILES_CONFIG,
                useValue: patchFilesConfig(options),
            },
            FilesService,
            FilesResolver,
        ]

        return {
            module: FilesModule,
            imports,
            controllers,
            providers,
            exports,
        }
    }
}
