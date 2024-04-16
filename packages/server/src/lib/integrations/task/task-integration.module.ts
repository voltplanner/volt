import { Module } from '@nestjs/common';

import { TaskModule } from '../../modules/task/task.module';
import { TaskIntegrationBootstrapService } from './services/task-integration-bootstrap.service';
import { TaskIntegrationResolver } from './task-integration.resolver';

@Module({
    imports: [TaskModule],
    providers: [
        TaskIntegrationResolver,
        TaskIntegrationBootstrapService,
    ],
})
export class TaskIntegrationModule {}
