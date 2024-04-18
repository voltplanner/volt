import { DefaultError } from '../../../shared/errors/default.error'

export class ProjectStatusDeleteUsedByProjectsError extends DefaultError {
    code = 'TASK_PROJECT_STATUS__000'
    name = 'TASK_PROJECT_STATUS__DELETE__USED_BY_PROJECTS__ERROR'

    constructor(dto: { usedByProjects: string[] }) {
        super({
            message: `Failed to delete status used by projects: ${dto.usedByProjects.join(
                '; ',
            )}`,
            metadata: dto,
        })
    }
}
