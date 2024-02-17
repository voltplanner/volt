export interface Methods {
    allowed: true
    description: string
    editable: false
    group: string
    id: string
    name: string
}
export interface Group {
    id: string
    name: string
    superuser: boolean
    editable: boolean
    methods: Methods[]
}
export interface RoleGroups {
    group: Group
}
