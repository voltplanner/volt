import { OrderEnum } from "../../../shared/interfaces/shared.interfaces"

export class TaskCreateRepositoryDto {
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

export class TaskUpdateRepositoryDto {
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

export class TaskDeleteRepositoryDto {
    id: string
}

export class TaskFindManyRepositoryDto {
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

export class TaskFindOneRepositoryDto {
    id: string
}

export class TaskFindSubtasksRepositoryDto {
    parentId: string
}
