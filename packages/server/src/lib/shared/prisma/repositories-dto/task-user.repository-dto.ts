export type TaskUserCreateRepositoryDto = {
    userId: string
}

export type TaskUserUpsertRepositoryDto = {
    userId: string
}

export type TaskUserDeleteRepositoryDto = {
    userId: string
}

export type TaskUserGetOneByExternalUserIdRepositoryDto = {
    userId: string
}

export type TaskProjectConnectProjectRepositoryDto = {
    userId: string
    projectId: string
}

export type TaskProjectDisconnectProjectRepositoryDto = {
    userId: string
    projectId: string
}
