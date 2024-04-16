import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'

export type TaskChangeCreateRepositoryDto = {
    taskId: string
    userId: string
    propertyName: string
    valueNew?: string
    valueOld?: string
}

export type TaskChangeDeleteRepositoryDto = {
    id: string
}

export type TaskChangeFindManyRepositoryDto = {
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
