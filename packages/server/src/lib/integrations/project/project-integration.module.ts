import { Module } from '@nestjs/common';

import { TaskModule } from '../../modules/task/task.module';
import { ProjectIntegrationResolver } from './project-integration.resolver';

@Module({
    imports: [TaskModule],
    providers: [
        ProjectIntegrationResolver
    ],
})
export class ProjectIntegrationModule {}
