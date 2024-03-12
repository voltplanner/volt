import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskProjectStatusCreateRepositoryDto = {
    name: string
    code: string
    description: string
}

export type TaskProjectStatusUpdateRepositoryDto = {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
}

export type TaskProjectStatusDeleteRepositoryDto = {
    id: string
}

export type TaskProjectStatusFindManyRepositoryDto = {
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
