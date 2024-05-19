import { DefaultError } from '../../../shared/errors/default.error'

export class TaskProjectUpdateConflictError extends DefaultError {
    code = 'TASK_000'
    name = 'TASK_PROJECT_UPDATE_CONFLICT_ERROR'

    constructor(dto: {
        id: string
        conflictingProps: Record<string, { old?: unknown; new: unknown | null }>
    }) {
        super({
            message: `An conflict occured while trying to update project: ${dto.id}`,
            metadata: dto,
        })
    }
}
