import { ConfigurableModuleBuilder } from '@nestjs/common'
import { merge } from 'lodash'

import { TaskEventPublisherProvider } from './task-events.config'

export interface TaskConfig {
    eventsProvider: TaskEventPublisherProvider
    customFieldValueTypes?: {
        code: string
        name: string
    }[]
    relations?: {
        code: string
        nameMain: string
        nameForeign: string
        description: string
    }[]
    statuses?: {
        code: string
        name: string
        description: string
        isDefault: boolean
    }[]
    tags?: {
        code: string
        name: string
        description: string
        isDefault: boolean
    }[]
    roles?: {
        name: string
        code: string
        description: string
    }[]
}

export const DEFAULT_TASK_CONFIG: Pick<
    TaskConfig,
    'customFieldValueTypes' | 'relations' | 'statuses' | 'tags' | 'roles'
> = {
    customFieldValueTypes: [
        {
            code: 'STRING',
            name: 'String',
        },
        {
            code: 'NUMBER',
            name: 'Number',
        },
    ],
    relations: [
        {
            code: 'CONNECTED_WITH',
            nameMain: 'Connected with',
            nameForeign: 'Connected with',
            description: '',
        },
        {
            code: 'CONNECTED_WITH',
            nameMain: 'Blocks',
            nameForeign: 'Blocked by',
            description: '',
        },
    ],
    statuses: [
        {
            code: 'OPENED',
            name: 'Opened',
            description: '',
            isDefault: true,
        },
        {
            code: 'IN_PROGRESS',
            name: 'In Progress',
            description: '',
            isDefault: false,
        },
        {
            code: 'CLOSED',
            name: 'Closed',
            description: '',
            isDefault: false,
        },
    ],
    tags: [
        {
            code: 'TASK',
            name: 'Task',
            description: '',
            isDefault: true,
        },
        {
            code: 'BUG',
            name: 'Bug',
            description: '',
            isDefault: false,
        },
        {
            code: 'STORY',
            name: 'Story',
            description: '',
            isDefault: false,
        },
    ],
    roles: [
        {
            name: 'Manager',
            description: 'Project manager',
            code: 'MANAGER',
        },
        {
            name: 'Performer',
            description: 'Project performer',
            code: 'PERFORMER',
        },
    ],
}

export function patchTaskConfig(
    config: Pick<typeof TASK_OPTIONS_TYPE, keyof typeof DEFAULT_TASK_CONFIG>,
) {
    if (config) {
        Object.assign(
            config,
            merge(DEFAULT_TASK_CONFIG, config),
        ) as typeof TASK_OPTIONS_TYPE
    }
    return config
}

export const {
    ConfigurableModuleClass: TaskConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: TASK_CONFIG,
    ASYNC_OPTIONS_TYPE: TASK_ASYNC_OPTIONS_TYPE,
    OPTIONS_TYPE: TASK_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<TaskConfig, 'forRoot'>({
    optionsInjectionToken: `TASK_CONFIG`,
}).build()
