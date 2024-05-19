import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'

export type CreateTaskEffortRepositoryDto = {
    value: number
    description: string
    taskId: string
    userId: string
}

export type UpdateTaskEffortRepositoryDto = {
    id: string
    value?: number
    description?: string
    userId?: string
}

export type DeleteTaskEffortRepositoryDto = {
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
