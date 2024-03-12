import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskCustomFieldCreateRepositoryDto = {
    value?: string
    taskId: string
    taskCustomFieldTypeId: string
}

export type TaskCustomFieldUpdateRepositoryDto = {
    id: string
    value?: string
}

export type TaskCustomFieldDeleteRepositoryDto = {
    id: string
}

export type TaskCustomFieldFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByTaskId?: string

    orderBy?: {
        field: 'createdAt'
        order: OrderEnum
    }
}
