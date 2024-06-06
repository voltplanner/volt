import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'

export type CreateTaskCommentRepositoryDto = {
    text: string
    taskId: string
    userId: string
}

export type UpdateTaskCommentRepositoryDto = {
    id: string
    text: string
    userId?: string
}

export type DeleteTaskCommentRepositoryDto = {
    id: string
    userId?: string
}

export type TaskCommentFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByText?: string
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
