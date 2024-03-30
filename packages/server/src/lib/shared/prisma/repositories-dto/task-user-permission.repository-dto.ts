export type TaskUserPermissionCreateRepositoryDto = {
    roleId: string
    actionId: string
    isAllowed?: boolean
}

export type TaskUserPermissionUpdateRepositoryDto = {
    id: string
    isAllowed: boolean
}

export type TaskUserPermissionDeleteRepositoryDto = {
    id: string
}
