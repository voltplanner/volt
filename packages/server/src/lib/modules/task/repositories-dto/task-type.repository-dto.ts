import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskTypeCreateRepositoryDto {
    name: string
    code: string
    description: string
    projectId: string
}

export class TaskTypeUpdateRepositoryDto {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
}

export class TaskTypeDeleteRepositoryDto {
    id: string
}

export class TaskTypeFindManyRepositoryDto {
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
