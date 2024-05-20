import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'

export type TaskEffortCreateRepositoryDto = {
    value: number
    description: string
    taskId: string
    userId: string
}

export type TaskEffortUpdateRepositoryDto = {
    id: string
    value?: number
    description?: string
    userId?: string
}

export type TaskEffortDeleteRepositoryDto = {
    id: string
    userId?: string
}

export type TaskEffortFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByTaskId?: string
    filterByUserId?: string
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'createdAt'
        order: OrderEnum
    }
}
