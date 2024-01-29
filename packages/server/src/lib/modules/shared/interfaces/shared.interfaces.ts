export interface PaginatedResponse<T> {
    meta: {
        curPage: number
        perPage: number
        total: number
    }
    data: T[]
}

export type NullableListOptions = { nullable?: true | 'itemsAndList' }

export enum OrderEnum {
    ASC = 'asc',
    DESC = 'desc',
}
