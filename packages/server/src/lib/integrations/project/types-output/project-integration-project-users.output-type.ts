import { ObjectType } from '@nestjs/graphql'

import { PaginatedResponseType } from '../../../shared/graphql/shared.graphql'
import { ProjectIntegrationUserObject } from '../types-object/project-integration-user.object-type'

@ObjectType()
export class ProjectIntegrationProjectUsersOutput extends PaginatedResponseType(
    ProjectIntegrationUserObject,
) {}
