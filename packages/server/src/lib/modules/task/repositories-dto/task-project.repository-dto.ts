import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskProjectCreateRepositoryDto = {
    name: string
    internalUserId: string
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
    internalUserId: string
    projectId: string
}

export type TaskProjectDisconnectUserRepositoryDto = {
    internalUserId: string
    projectId: string
}
