export class ProjectStatusDeleteInUseError extends Error {
    code = 'PROJECT-000'
    name = 'PROJECT_STATUS_DELETE_IN_USE_ERROR'
    metadata: any

    constructor(metadata: {
        usedByProjects: string[]
    }) {
        super(`Failed to delete status used by projects: ${metadata.usedByProjects.join('; ')}`)

        this.metadata = metadata
    }
}
