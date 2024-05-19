export type TaskUserRoleUpsertRepositoryDto = {
    code: string
    name: string
    projectId: string
    description: string
}

export type TaskUserRoleUpdateRepositoryDto = {
    id: string
    code?: string
    name?: string
    position?: number
    description?: string | null
}

export type TaskUserRoleDeleteRepositoryDto = {
    id: string
}

export type TaskUserRoleFindManyRepositoryDto = {
    projectId: string
}

export type TaskUserRoleGetOneByCodeRepositoryDto = {
    projectId: string
    code: string
}
