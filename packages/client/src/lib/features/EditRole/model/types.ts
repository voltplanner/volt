type TMethod = {
    allowed: boolean
    description: string
    editable: boolean
    group: string
    id: string
    name: string
    __typename: string
}
type TMethodGroup = {
    name: string
    rules: TMethod[]
}
type TRole = {
    id: string
    name: string
    methods: TMethod[]
    superuser: boolean
    editable: boolean
    __typename: string
}
export type TChangedPermissions = Pick<TMethod, 'id' | 'allowed'>
export interface RoleStore {
    role: TRole
    methodsSeparated: TMethodGroup[],
    methodsChanged: TChangedPermissions[],
    separateMethods: () => void
    setRole: (role: TRole) => void
    toggleMethod: (id: string) => void
}