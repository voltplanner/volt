import { Module } from '@nestjs/common';

import { PrismaModule } from '../../shared/prisma';
import { TaskProjectService } from './services/task-project.service';
import { TaskUserService } from './services/task-user.service';
import { TaskService } from './services/task.service';

@Module({
    imports: [PrismaModule],
    providers: [
        TaskProjectService,
        TaskUserService,
        TaskService,
    ],
    exports: [
        TaskProjectService,
        TaskUserService,
        TaskService,
    ]
})
export class TaskModule {}
