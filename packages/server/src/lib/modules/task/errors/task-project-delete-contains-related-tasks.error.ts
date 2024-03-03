import { DefaultError } from "../../../shared/errors/default.error"

export class TaskProjectDeleteContainsRelatedTasksError extends DefaultError {
    code = 'TASK_PROJECT__000'
    name = 'TASK_PROJECT__DELETE__CONTAINS_RELATED_TASKS__ERROR'

    constructor() {
        super({ message: `Failed to delete project because it contains related tasks` })
    }
}
