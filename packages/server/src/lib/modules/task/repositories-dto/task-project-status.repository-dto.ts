import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskProjectStatusCreateRepositoryDto {
    name: string
    code: string
    description: string
}

export class TaskProjectStatusUpdateRepositoryDto {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
}

export class TaskProjectStatusDeleteRepositoryDto {
    id: string
}

export class TaskProjectStatusFindManyRepositoryDto {
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
