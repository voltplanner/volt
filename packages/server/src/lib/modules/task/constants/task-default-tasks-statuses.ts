export const TASK_DEFAULT_TASKS_STATUSES = [
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
] as const
