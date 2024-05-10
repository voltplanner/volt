import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'

export type TaskProjectCreateRepositoryDto = {
    name: string
    budget?: number
    deadline?: Date
    description?: string
}

export type TaskProjectUpdateRepositoryDto = {
    id: string
    version: number
    name?: string
    budget?: number | null
    deadline?: Date | null
    description?: string | null
}

export type TaskProjectDeleteRepositoryDto = {
    id: string
}

export type TaskProjectFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByName?: string | string[]
    filterByUserId?: string | string[]
    filterByFulltext?: string | string[]
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'name' | 'status' | 'createdAt'
        order: OrderEnum
    }
}

export type TaskProjectGetByIdRepositoryDto = {
    id: string
}

export type TaskProjectConnectUsersRepositoryDto = {
    projectId: string
    userIds: string[]
}

export type TaskProjectDisconnectUsersRepositoryDto = {
    projectId: string
    userIds: string[]
}
