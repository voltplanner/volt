export type TaskUserActionCreateRepositoryDto = {
    code: string
    name: string
    description: string
}

export type TaskUserActionUpdateRepositoryDto = {
    id: string
    code?: string
    name?: string
    position?: number
    description?: string | null
}

export type TaskUserActionDeleteRepositoryDto = {
    id: string
}

export type TaskUserActionFindManyRepositoryDto = {
    curPage?: number
    perPage?: number
}

export type TaskUserActionGetOneByCodeRepositoryDto = {
    code: string
}
