import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskStatusCreateRepositoryDto {
    name: string
    code: string
    description: string
    projectId: string
}

export class TaskStatusUpdateRepositoryDto {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
}

export class TaskStatusDeleteRepositoryDto {
    id: string
}

export class TaskStatusFindManyRepositoryDto {
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
