import { Module } from '@nestjs/common'

import { PrismaModule, PrismaService } from '../../shared/prisma'
import { TaskService } from './services/task.service'
import { TaskProjectService } from './services/task-project.service'
import { TaskUserService } from './services/task-user.service'

@Module({
    imports: [PrismaModule],
    providers: [TaskProjectService, TaskUserService, TaskService],
    exports: [TaskProjectService, TaskUserService, TaskService],
})
export class TaskModule {}
