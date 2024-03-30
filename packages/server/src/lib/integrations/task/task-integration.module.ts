import { Module } from '@nestjs/common';

import { TaskModule } from '../../modules/task/task.module';
import { TaskIntegrationBootstrapService } from './services/task-integration-bootstrap.service';
import { TaskIntegrationInitService } from './services/task-integration-init.service';
import { TaskIntegrationResolver } from './task-integration.resolver';

@Module({
    imports: [TaskModule],
    providers: [
        TaskIntegrationResolver,
        TaskIntegrationInitService,
        TaskIntegrationBootstrapService,
    ],
})
export class TaskIntegrationModule {}
