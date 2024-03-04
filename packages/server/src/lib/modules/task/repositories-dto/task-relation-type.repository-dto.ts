import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskRelationTypeCreateRepositoryDto {
    code: string
    name_main: string
    name_foreign: string
    projectId: string
}

export class TaskRelationTypeUpdateRepositoryDto {
    id: string
    code?: string
    position?: number
    name_main?: string
    name_foreign?: string
}

export class TaskRelationTypeDeleteRepositoryDto {
    id: string
}

export class TaskRelationTypeFindManyRepositoryDto {
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
