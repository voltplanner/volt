import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskCustomFieldValueTypeCreateRepositoryDto = {
    code: string
    name: string
}

export type TaskCustomFieldValueTypeUpdateRepositoryDto = {
    id: string
    name?: string
    code?: string
    position?: number
}

export type TaskCustomFieldValueTypeUpsertRepositoryDto = {
    code: string
    name: string
}

export type TaskCustomFieldValueTypeDeleteRepositoryDto = {
    id: string
}

export type TaskCustomFieldValueTypeFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByName?: string

    orderBy?: {
        field: 'position'
        order: OrderEnum
    }
}
