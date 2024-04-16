import { Module } from '@nestjs/common';

import { TaskModule } from '../../modules/task/task.module';
import { ProjectIntegrationResolver } from './project-integration.resolver';
import { ProjectIntegrationInitService } from './services/project-integration-init.service';

@Module({
    imports: [TaskModule],
    providers: [
        ProjectIntegrationResolver,
        ProjectIntegrationInitService,
    ],
})
export class ProjectIntegrationModule {}
