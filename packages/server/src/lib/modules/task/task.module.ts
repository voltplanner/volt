import { Module } from '@nestjs/common'

import { PrismaModule } from '../../shared/prisma'
import { TaskService } from './services/task.service'
import { TaskProjectService } from './services/task-project.service'
import { TaskUserService } from './services/task-user.service'
import { TaskBootstrap } from './task.bootstrap'

@Module({
    imports: [PrismaModule],
    providers: [TaskProjectService, TaskUserService, TaskService],
    exports: [TaskProjectService, TaskUserService, TaskService],
})
export class TaskModule {
    static forRoot() {
        return {
            module: TaskModule,
            providers: [TaskBootstrap],
        }
    }
}
