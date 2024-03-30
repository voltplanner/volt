import { Injectable } from "@nestjs/common";

import { TaskService } from "../../../modules/task/services/task.service";
import { DEFAULT_TASK_CUSTOM_FIELD_VALUE_TYPES } from "../constants/task-integration-default-task-custom-field-value-types";

@Injectable()
export class TaskIntegrationBootstrapService {
    constructor(
        private readonly _taskService: TaskService,
    ) {}

    async onApplicationBootstrap() {
        await this.initTaskCustomFieldValueType()
    }

    async initTaskCustomFieldValueType() {
        for (const item of DEFAULT_TASK_CUSTOM_FIELD_VALUE_TYPES) {
            await this._taskService.customFieldValueTypeUpsert(item)
        }
    }
}
