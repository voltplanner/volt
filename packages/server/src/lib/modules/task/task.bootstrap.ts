import { Injectable } from '@nestjs/common'

import { TASK_DEFAULT_CUSTOM_FIELD_VALUE_TYPES } from './constants/task-default-custom-field-value-types'
import { TaskService } from './services/task.service'

@Injectable()
export class TaskBootstrap {
    constructor(private readonly _taskService: TaskService) {}

    async onApplicationBootstrap() {
        await this.initTaskCustomFieldValueType()
    }

    async initTaskCustomFieldValueType() {
        for (const item of TASK_DEFAULT_CUSTOM_FIELD_VALUE_TYPES) {
            await this._taskService.customFieldValueTypeUpsert(item)
        }
    }
}
