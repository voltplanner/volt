export const DEFAULT_USER_ROLE_CODES = {
    MANAGER: 'MANAGER',
    PERFORMER: 'PERFORMER',
} as const

export const DEFAULT_USERS_ROLES: Record<
    keyof typeof DEFAULT_USER_ROLE_CODES,
    { name: string; description: string }
> = {
    [DEFAULT_USER_ROLE_CODES.MANAGER]: {
        name: 'Manager',
        description: 'Project manager',
    },
    [DEFAULT_USER_ROLE_CODES.PERFORMER]: {
        name: 'Performer',
        description: 'Project performer',
    },
} as const
