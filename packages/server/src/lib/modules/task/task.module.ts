import { DynamicModule, Module, Provider, Type } from '@nestjs/common'

import { TASK_PUBLISHER } from './configs/task-events.config'
import {
    patchTaskConfig,
    TASK_CONFIG,
    TASK_OPTIONS_TYPE,
    TaskConfigurableModuleClass,
} from './configs/task-module.config'
import { TaskService } from './services/task.service'
import { TaskBootstrap } from './services/task-bootstrap.service'
import { TaskCommentService } from './services/task-comment.service'
import { TaskEffortService } from './services/task-effort.service'
import { TaskProjectService } from './services/task-project.service'
import { TaskUserService } from './services/task-user.service'

@Module({})
export class TaskModule extends TaskConfigurableModuleClass {
    static forRoot(options: typeof TASK_OPTIONS_TYPE): DynamicModule {
        const imports: any[] = []
        const controllers: Type<any>[] = []
        const providers: Provider[] = [
            {
                provide: TASK_CONFIG,
                useValue: patchTaskConfig(options),
            },
            {
                provide: TASK_PUBLISHER,
                ...options.eventsProvider,
            },
            TaskProjectService,
            TaskUserService,
            TaskService,
            TaskCommentService,
            TaskBootstrap,
            TaskEffortService,
        ]

        return {
            module: TaskModule,
            imports,
            controllers,
            providers,
            exports: providers,
        }
    }
}
