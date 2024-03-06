import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskCustomFieldTypeCreateRepositoryDto {
    code: string
    name: string
    projectId: string
    valueTypeId: string
    isEditable?: boolean
    isRequired?: boolean
    isSearchable?: boolean
    isFilterable?: boolean
    possibleValues?: string
    defaultValue?: string
    regexp?: string
}

export class TaskCustomFieldTypeUpdateRepositoryDto {
    id: string
    code?: string
    name?: string
    position?: number
    isEditable?: boolean
    isRequired?: boolean
    isSearchable?: boolean
    isFilterable?: boolean
    possibleValues?: string
    defaultValue?: string
    regexp?: string
}

export class TaskCustomFieldTypeDeleteRepositoryDto {
    id: string
}

export class TaskCustomFieldTypeFindManyRepositoryDto {
    curPage?: number
    perPage?: number

    filterByName?: string

    orderBy?: {
        field: 'position'
        order: OrderEnum
    }
}
