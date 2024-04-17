import { ObjectType } from '@nestjs/graphql'

import { PaginatedResponseType } from '../../../shared/graphql/shared.graphql'
import { ProjectIntegrationProjectObject } from '../types-object/project-integration-project.object-type'

@ObjectType()
export class ProjectIntegrationProjectsOfCurrentUserOutput extends PaginatedResponseType(
    ProjectIntegrationProjectObject,
) {}
