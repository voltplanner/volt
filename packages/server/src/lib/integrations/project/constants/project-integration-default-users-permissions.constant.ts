import { DEFAULT_USERS_ACTIONS } from './project-integration-default-users-actions.constant'
import { DEFAULT_USER_ROLE_CODES } from './project-integration-default-users-roles.constant'

export const DEFAULT_USERS_PERMISSIONS: Record<
    keyof typeof DEFAULT_USER_ROLE_CODES,
    Record<keyof typeof DEFAULT_USERS_ACTIONS, boolean>
> = {
    MANAGER: {
        projectCreate: true,
    },
    PERFORMER: {
        projectCreate: false,
    },
}
