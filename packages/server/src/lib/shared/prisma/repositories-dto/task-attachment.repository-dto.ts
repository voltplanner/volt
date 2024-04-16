import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'

export type TaskAttachmentCreateRepositoryDto = {
    name: string
    sizeKb: number
    externalId: string
    taskId: string
    userId: string
    description?: string
}

export type TaskAttachmentUpdateRepositoryDto = {
    id: string
    name?: string
    description?: string
}

export type TaskAttachmentDeleteRepositoryDto = {
    id: string
}

export type TaskAttachmentFindManyRepositoryDto = {
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
