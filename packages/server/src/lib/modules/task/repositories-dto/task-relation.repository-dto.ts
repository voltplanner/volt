import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskRelationCreateRepositoryDto {
    code: string
    nameMain: string
    nameForeign: string
    projectId: string
    description?: string
}

export class TaskRelationUpdateRepositoryDto {
    id: string
    code?: string
    position?: number
    nameMain?: string
    nameForeign?: string
    description?: string
}

export class TaskRelationDeleteRepositoryDto {
    id: string
}

export class TaskRelationFindManyRepositoryDto {
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

export class TaskRelationConnectTaskRepositoryDto {
    taskMainId: string
    taskForeignId: string
    taskRelationId: string
}

export class TaskRelationDisconnectTaskRepositoryDto {
    taskMainId: string
    taskForeignId: string
    taskRelationId: string
}
