import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskRelationCreateRepositoryDto = {
    code: string
    nameMain: string
    nameForeign: string
    projectId: string
    description?: string
}

export type TaskRelationUpdateRepositoryDto = {
    id: string
    code?: string
    position?: number
    nameMain?: string
    nameForeign?: string
    description?: string
}

export type TaskRelationUpsertRepositoryDto = {
    code: string
    nameMain: string
    nameForeign: string
    projectId: string
    description?: string | null
}

export type TaskRelationDeleteRepositoryDto = {
    id: string
}

export type TaskRelationFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByNameMain?: string
    filterByNameForeign?: string
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'position'
        order: OrderEnum
    }
}

export type TaskRelationConnectTaskRepositoryDto = {
    taskMainId: string
    taskForeignId: string
    taskRelationId: string
}

export type TaskRelationDisconnectTaskRepositoryDto = {
    taskMainId: string
    taskForeignId: string
    taskRelationId: string
}
