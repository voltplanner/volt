import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskProjectFindManyRepositoryDto {
    curPage?: number
    perPage?: number

    filterByName?: string
    filterByStatus?: string
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'name' | 'status' | 'createdAt'
        order: OrderEnum
    }
}
