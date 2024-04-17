import { ObjectType } from "@nestjs/graphql";

import { PaginatedResponseType } from "../../../shared/graphql/shared.graphql";
import { TaskIntegrationTaskObject } from "../types-object/task-integration-task.object-type";

@ObjectType()
export class TaskIntegrationTasksOfCurrentUserOutput extends PaginatedResponseType(TaskIntegrationTaskObject) {}
