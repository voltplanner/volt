import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskProjectCreateRepositoryDto = {
    name: string
    userId: string
    statusId: string
    description: string
}

export type TaskProjectUpdateRepositoryDto = {
    id: string
    version: number
    name?: string
    statusId?: string
    description?: string | null
}

export type TaskProjectDeleteRepositoryDto = {
    id: string
}

export type TaskProjectFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByName?: string
    filterByStatusId?: string
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'name' | 'status' | 'createdAt'
        order: OrderEnum
    }
}

export type TaskProjectConnectUserRepositoryDto = {
    userId: string
    projectId: string
}

export type TaskProjectDisconnectUserRepositoryDto = {
    userId: string
    projectId: string
}
