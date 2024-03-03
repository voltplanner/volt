import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskProjectStatusFindManyRepositoryDto {
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
