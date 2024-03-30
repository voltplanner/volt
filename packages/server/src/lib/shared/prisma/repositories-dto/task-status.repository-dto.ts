import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskStatusCreateRepositoryDto = {
    name: string
    code: string
    projectId: string
    description: string
    isDefault?: boolean
}

export type TaskStatusUpdateRepositoryDto = {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
    isDefault?: boolean
}

export type TaskStatusUpsertRepositoryDto = {
    name: string
    code: string
    projectId: string
    description?: string | null
    isDefault?: boolean
}

export type TaskStatusDeleteRepositoryDto = {
    id: string
}

export type TaskStatusFindManyRepositoryDto = {
    projectId: string
}

export type TaskStatusSetDefaultRepositoryDto = {
    id: string
}
