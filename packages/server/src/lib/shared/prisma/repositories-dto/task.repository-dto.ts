import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export type TaskCreateRepositoryDto = {
    name: string
    description?: string
    estimatedDateEnd?: string
    estimatedDateStart?: string
    estimatedDuration?: number

    typeId: string
    statusId: string
    projectId: string
    createdById: string

    parentId?: string
    assignedToId?: string
}

export type TaskUpdateRepositoryDto = {
    id: string

    name?: string
    description?: string
    estimatedDateEnd?: string
    estimatedDateStart?: string
    estimatedDuration?: number

    typeId?: string
    parentId?: string
    statusId?: string
    assignedToId?: string
}

export type TaskDeleteRepositoryDto = {
    id: string
}

export type TaskFindManyRepositoryDto = {
    curPage?: number
    perPage?: number

    filterByName?: string
    filterByNumber?: number
    filterByTypeId?: string
    filterByStatusId?: string
    filterByParentId?: string
    filterByProjectId?: string
    filterByCreatedById?: string
    filterByAssignedToId?: string
    filterByCreatedAt?: {
        from?: Date
        to?: Date
    }

    orderBy?: {
        field: 'name' | 'status' | 'createdAt'
        order: OrderEnum
    }
}

export type TaskFindOneRepositoryDto = {
    id: string
}

export type TaskFindSubtasksRepositoryDto = {
    parentId: string
}
