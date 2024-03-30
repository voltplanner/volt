import { DEFAULT_USER_ACTIONS } from "./task-integration-default-user-actions.constant";
import { DEFAULT_USER_ROLE_CODES } from "./task-integration-default-user-roles.constant";

export const DEFAULT_USER_PERMISSIONS: Record<
    keyof typeof DEFAULT_USER_ROLE_CODES,
    Record<keyof typeof DEFAULT_USER_ACTIONS, boolean>
> = {
    MANAGER: {
        projectCreate: true,
    },
    PERFORMER: {
        projectCreate: false,
    }
}
