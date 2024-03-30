
export type TaskTagCreateRepositoryDto = {
    code: string
    name: string
    description: string
    projectId: string
}

export type TaskTagUpdateRepositoryDto = {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
}

export type TaskTagUpsertRepositoryDto = {
    name: string
    code: string
    projectId: string
    description?: string | null
    isDefault?: boolean
}

export type TaskTagDeleteRepositoryDto = {
    id: string
}

export type TaskTagFindManyRepositoryDto = {
    projectId: string
}

export type TaskTagConnectTaskRepositoryDto = {
    taskTagId: string
    taskId: string
}

export type TaskTagDisconnectTaskRepositoryDto = {
    taskTagId: string
    taskId: string
}
