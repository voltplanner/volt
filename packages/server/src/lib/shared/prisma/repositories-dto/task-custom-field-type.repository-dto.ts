import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'

export type TaskCustomFieldTypeCreateRepositoryDto = {
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

export type TaskCustomFieldTypeUpdateRepositoryDto = {
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

export type TaskCustomFieldTypeDeleteRepositoryDto = {
    id: string
}

export type TaskCustomFieldTypeFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByName?: string

    orderBy?: {
        field: 'position'
        order: OrderEnum
    }
}
