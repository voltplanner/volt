import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskChangeCreateRepositoryDto {
    taskId: string
    userId: string
    propertyName: string
    valueNew?: string
    valueOld?: string
}

export class TaskChangeDeleteRepositoryDto {
    id: string
}

export class TaskChangeFindManyRepositoryDto {
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
