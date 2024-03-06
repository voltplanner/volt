import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskAttachmentCreateRepositoryDto {
    name: string
    sizeKb: number
    externalId: string
    taskId: string
    userId: string
    description?: string
}

export class TaskAttachmentUpdateRepositoryDto {
    id: string
    name?: string
    description?: string
}

export class TaskAttachmentDeleteRepositoryDto {
    id: string
}

export class TaskAttachmentFindManyRepositoryDto {
    curPage?: number
    perPage?: number

    filterByName?: string
    filterByTaskId?: string
    filterByUserId?: string
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'createdAt'
        order: OrderEnum
    }
}
