export class TaskConfig<TRoleCode extends string = string> {
    constructor(
        readonly defaultTaskCustomFieldValueTypes: {
            code: string
            name: string
        }[],
        readonly defaultTaskRelations: {
            code: string
            nameMain: string
            nameForeign: string
            description: string
        }[],
        readonly defaultTaskStatuses: {
            code: string
            name: string
            description: string
            isDefault: boolean
        }[],
        readonly defaultTaskTags: {
            code: string
            name: string
            description: string
            isDefault: boolean
        }[],
        readonly defaultTaskUserRoles: {
            code: TRoleCode
            name: string
            description: string
        }[],
    ) {}
}
