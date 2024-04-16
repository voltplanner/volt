import { Module } from '@nestjs/common'

import { AuthModule } from '../../modules/auth/auth.module'
import { TaskModule } from '../../modules/task/task.module'
import { TaskIntegrationBootstrapService } from './services/task-integration-bootstrap.service'
import { TaskIntegrationResolver } from './task-integration.resolver'

@Module({
    imports: [TaskModule, AuthModule],
    providers: [TaskIntegrationResolver, TaskIntegrationBootstrapService],
})
export class TaskIntegrationModule {}
