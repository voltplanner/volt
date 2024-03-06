import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskTagCreateRepositoryDto {
    code: string
    name: string
    description: string
    projectId: string
}

export class TaskTagUpdateRepositoryDto {
    id: string
    name?: string
    code?: string
    position?: number
    description?: string | null
}

export class TaskTagDeleteRepositoryDto {
    id: string
}

export class TaskTagFindManyRepositoryDto {
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

export class TaskTagConnectTaskRepositoryDto {
    taskTagId: string
    taskId: string
}

export class TaskTagDisconnectTaskRepositoryDto {
    taskTagId: string
    taskId: string
}
