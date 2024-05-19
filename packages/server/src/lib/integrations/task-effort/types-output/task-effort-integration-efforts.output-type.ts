import { ObjectType } from '@nestjs/graphql'

import { PaginatedResponseType } from '../../../shared/graphql/shared.graphql'
import { TaskEffortIntegrationEffortObject } from '../types-object/task-effort-integration-effort.object-type'

@ObjectType()
export class TaskEffortIntegrationEffortsOutput extends PaginatedResponseType(
    TaskEffortIntegrationEffortObject,
) {}
