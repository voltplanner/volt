import { ObjectType } from '@nestjs/graphql'

import { PaginatedResponseType } from '../../../shared/graphql/shared.graphql'
import { TaskCommentIntegrationCommentObject } from '../types-object/task-comment-integration-comment.object-type'

@ObjectType()
export class TaskCommentIntegrationCommentsOutput extends PaginatedResponseType(
    TaskCommentIntegrationCommentObject,
) {}
