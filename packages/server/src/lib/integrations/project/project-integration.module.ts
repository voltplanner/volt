import { Module } from '@nestjs/common'

import { AuthModule } from '../../modules/auth/auth.module'
import { TaskModule } from '../../modules/task/task.module'
import { ProjectIntegrationResolver } from './project-integration.resolver'
import { ProjectIntegrationInitService } from './services/project-integration-init.service'

@Module({
    imports: [TaskModule, AuthModule],
    providers: [ProjectIntegrationResolver, ProjectIntegrationInitService],
})
export class ProjectIntegrationModule {}
