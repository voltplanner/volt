import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskEffortCreateRepositoryDto {
    value: number
    description: string
    taskId: string
    userId: string
}

export class TaskEffortUpdateRepositoryDto {
    id: string
    value?: number
    description?: string
}

export class TaskEffortDeleteRepositoryDto {
    id: string
}

export class TaskEffortFindManyRepositoryDto {
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
