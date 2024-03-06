import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskCustomFieldValueTypeCreateRepositoryDto {
    code: string
    name: string
}

export class TaskCustomFieldValueTypeUpdateRepositoryDto {
    id: string
    name?: string
    code?: string
    position?: number
}

export class TaskCustomFieldValueTypeDeleteRepositoryDto {
    id: string
}

export class TaskCustomFieldValueTypeFindManyRepositoryDto {
    curPage?: number
    perPage?: number

    filterByName?: string

    orderBy?: {
        field: 'position'
        order: OrderEnum
    }
}
