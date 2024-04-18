import { Inject, Injectable } from '@nestjs/common'

import { TASK_CONFIG, TaskConfig } from '../configs/task-module.config'
import { TaskService } from './task.service'

@Injectable()
export class TaskBootstrap {
    constructor(
        @Inject(TASK_CONFIG)
        private readonly config: TaskConfig,
        private readonly taskService: TaskService,
    ) {}

    async onApplicationBootstrap() {
        await this.initTaskCustomFieldValueType()
    }

    async initTaskCustomFieldValueType() {
        for (const item of this.config.customFieldValueTypes) {
            await this.taskService.upsertCustomFieldValueType(item)
        }
    }
}
