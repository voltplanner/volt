export const TASK_DEFAULT_USER_ROLE_CODES = {
    MANAGER: 'MANAGER',
    PERFORMER: 'PERFORMER',
} as const

export const TASK_DEFAULT_USERS_ROLES: Record<
    keyof typeof TASK_DEFAULT_USER_ROLE_CODES,
    { name: string; description: string }
> = {
    MANAGER: {
        name: 'Manager',
        description: 'Project manager',
    },
    PERFORMER: {
        name: 'Performer',
        description: 'Project performer',
    },
} as const
