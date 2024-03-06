import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskCustomFieldCreateRepositoryDto {
    value?: string
    taskId: string
    taskCustomFieldTypeId: string
}

export class TaskCustomFieldUpdateRepositoryDto {
    id: string
    value?: string
}

export class TaskCustomFieldDeleteRepositoryDto {
    id: string
}

export class TaskCustomFieldFindManyRepositoryDto {
    curPage?: number
    perPage?: number

    filterByTaskId?: string

    orderBy?: {
        field: 'createdAt'
        order: OrderEnum
    }
}
