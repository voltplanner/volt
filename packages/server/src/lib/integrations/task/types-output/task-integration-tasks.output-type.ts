import { ObjectType } from '@nestjs/graphql'

import { PaginatedResponseType } from '../../../shared/graphql/shared.graphql'
import { TaskIntegrationTaskObject } from '../types-object/task-integration-task.object-type'

@ObjectType()
export class TaskIntegrationTasksOutput extends PaginatedResponseType(
    TaskIntegrationTaskObject,
) {}
