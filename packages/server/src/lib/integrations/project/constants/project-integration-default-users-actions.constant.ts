import { ProjectIntegrationResolver } from '../project-integration.resolver'

export const DEFAULT_USERS_ACTIONS: Record<string, {
    description: string
    name: string
}> = {
    // [<'projectCreate'>ProjectIntegrationResolver.__proto__.projectCreate.name]:
    //     {
    //         description: 'Is a user with this role allowed to create projects',
    //         name: 'Create project',
    //     },
} as const
