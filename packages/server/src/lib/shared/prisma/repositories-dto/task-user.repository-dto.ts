export type TaskUserCreateRepositoryDto = {
    id: string
    roleId: string
}

export type TaskUserFindAllRepositoryDto = {
    projectId: string
}

export type TaskProjectConnectProjectRepositoryDto = {
    id: string
    projectId: string
}

export type TaskProjectDisconnectProjectRepositoryDto = {
    id: string
    projectId: string
}
