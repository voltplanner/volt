export type TaskUserCreateRepositoryDto = {
    externalUserId: string
}

export type TaskUserDeleteRepositoryDto = {
    externalUserId: string
}

export type TaskUserGetOneByExternalUserIdRepositoryDto = {
    externalUserId: string
}

export type TaskProjectConnectProjectRepositoryDto = {
    userId: string
    projectId: string
}

export type TaskProjectDisconnectProjectRepositoryDto = {
    userId: string
    projectId: string
}
