import { Module } from '@nestjs/common';

import { PrismaModule } from '../../shared/prisma';
import { TaskRepository } from './repositories/task.repository';
import { TaskAttachmentRepository } from './repositories/task-attachment.repository';
import { TaskChangeRepository } from './repositories/task-change.repository';
import { TaskCommentRepository } from './repositories/task-comment.repository';
import { TaskCustomFieldRepository } from './repositories/task-custom-field.repository';
import { TaskCustomFieldTypeRepository } from './repositories/task-custom-field-type.repository';
import { TaskCustomFieldValueTypeRepository } from './repositories/task-custom-field-value-type.repository';
import { TaskEffortRepository } from './repositories/task-effort.repository';
import { TaskProjectRepository } from './repositories/task-project.repository';
import { TaskProjectStatusRepository } from './repositories/task-project-status.repository';
import { TaskRelationRepository } from './repositories/task-relation.repository';
import { TaskStatusRepository } from './repositories/task-status.repository';
import { TaskTagRepository } from './repositories/task-tag.repository';
import { TaskTypeRepository } from './repositories/task-type.repository';
import { TaskUserRepository } from './repositories/task-user.repository';
import { TaskProjectService } from './services/task-project.service';

@Module({
    imports: [PrismaModule],
    providers: [
        TaskAttachmentRepository,
        TaskChangeRepository,
        TaskCommentRepository,
        TaskCustomFieldTypeRepository,
        TaskCustomFieldValueTypeRepository,
        TaskCustomFieldRepository,
        TaskEffortRepository,
        TaskProjectStatusRepository,
        TaskProjectRepository,
        TaskRelationRepository,
        TaskStatusRepository,
        TaskTagRepository,
        TaskTypeRepository,
        TaskUserRepository,
        TaskRepository,
        TaskProjectService,
    ],
    exports: [
        TaskProjectService,
    ]
})
export class TaskModule {}
