import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskStatusCreateRepositoryDto = {
    name: string
    code: string
    description: string
    projectId: string
}

export type TaskStatusUpdateRepositoryDto = {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
}

export type TaskStatusDeleteRepositoryDto = {
    id: string
}

export type TaskStatusFindManyRepositoryDto = {
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
