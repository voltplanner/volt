import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskCommentCreateRepositoryDto = {
    text: string
    taskId: string
    userId: string
}

export type TaskCommentUpdateRepositoryDto = {
    id: string
    text?: string
}

export type TaskCommentDeleteRepositoryDto = {
    id: string
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
