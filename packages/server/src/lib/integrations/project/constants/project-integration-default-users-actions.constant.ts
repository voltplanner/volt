import { TaskIntegrationResolver } from "../project-integration.resolver";

export const DEFAULT_USERS_ACTIONS = {
    [<'projectCreate'>TaskIntegrationResolver.prototype.createProject.name]: {
        description: 'Is a user with this role allowed to create projects',
        name: 'Create project',
    },
} as const
