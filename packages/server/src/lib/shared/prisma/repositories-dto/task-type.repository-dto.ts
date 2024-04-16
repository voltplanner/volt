import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'

export type TaskTypeCreateRepositoryDto = {
    name: string
    code: string
    description: string
    projectId: string
}

export type TaskTypeUpdateRepositoryDto = {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
}

export type TaskTypeDeleteRepositoryDto = {
    id: string
}

export type TaskTypeFindManyRepositoryDto = {
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
