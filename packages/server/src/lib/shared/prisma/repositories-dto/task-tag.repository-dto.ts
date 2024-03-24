import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

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

export type TaskTagDeleteRepositoryDto = {
    id: string
}

export type TaskTagFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByName?: string
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'position'
        order: OrderEnum
    }
}

export type TaskTagConnectTaskRepositoryDto = {
    taskTagId: string
    taskId: string
}

export type TaskTagDisconnectTaskRepositoryDto = {
    taskTagId: string
    taskId: string
}
