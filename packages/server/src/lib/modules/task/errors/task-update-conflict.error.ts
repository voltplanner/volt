import { DefaultError } from '../../../shared/errors/default.error'

export class TaskUpdateConflictError extends DefaultError {
    code = 'TASK_001'
    name = 'TASK_UPDATE_CONFLICT_ERROR'

    constructor(dto: {
        id: string;
        conflictingProps: Record<string, { old?: unknown; new: unknown | null }>
    }) {
        super({
            message: `An conflict occured while trying to update task: ${dto.id}`,
            metadata: dto,
        })
    }
}
