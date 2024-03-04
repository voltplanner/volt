import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskProjectCreateRepositoryDto {
    name: string
    userId: string
    statusId: string
    description: string
}

export class TaskProjectUpdateRepositoryDto {
    id: string
    version: number
    name?: string
    statusId?: string
    description?: string | null
}

export class TaskProjectDeleteRepositoryDto {
    id: string
}

export class TaskProjectFindManyRepositoryDto {
    curPage?: number
    perPage?: number

    filterByName?: string
    filterByStatus?: string
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'name' | 'status' | 'createdAt'
        order: OrderEnum
    }
}

export class TaskProjectConnectUserRepositoryDto {
    userId: string
    projectId: string
}

export class TaskProjectDisconnectUserRepositoryDto {
    userId: string
    projectId: string
}
