export class ProjectDeleteContainsTasksError extends Error {
    code = 'PROJECT-000'
    name = 'PROJECT_DELETE_CONTAINS_TASKS_ERROR'
    metadata: any

    constructor() {
        super(`Failed to delete project because it contains related tasks`)
    }
}
