export interface PaginatedResponse<T> {
    meta: {
        curPage: number
        perPage: number
        total: number
    }
    data: T[]
}

export interface PaginatedInput {
    curPage?: number
    perPage?: number
}

export type NullableListOptions = { nullable?: true | 'itemsAndList' }

export enum OrderEnum {
    ASC = 'asc',
    DESC = 'desc',
}

export interface CurrentUserPayload {
    role: string
    userId: string
}
