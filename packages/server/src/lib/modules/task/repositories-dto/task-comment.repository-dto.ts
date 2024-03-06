import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskCommentCreateRepositoryDto {
    text: string
    taskId: string
    userId: string
}

export class TaskCommentUpdateRepositoryDto {
    id: string
    text?: string
}

export class TaskCommentDeleteRepositoryDto {
    id: string
}

export class TaskCommentFindManyRepositoryDto {
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
