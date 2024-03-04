export class TaskUserCreateRepositoryDto {
    externalUserId: string
}

export class TaskUserDeleteRepositoryDto {
    externalUserId: string
}

export class TaskUserGetOneByExternalUserIdRepositoryDto {
    externalUserId: string
}

export class TaskProjectConnectProjectRepositoryDto {
    userId: string
    projectId: string
}

export class TaskProjectDisconnectProjectRepositoryDto {
    userId: string
    projectId: string
}
