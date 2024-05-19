import request, { gql } from 'graphql-request'

import { GetUsersInput } from '../../../../../../../../packages/server/src/lib/modules/auth/interfaces/auth.graphql'
import { ProjectIntegrationCreateProjectInput } from '../../../project/types-input/project-integration-project-create.input-type'
import { ProjectIntegrationProjectTasksStatusesInput } from '../../../project/types-input/project-integration-project-tasks-statuses.input-type'
import { TaskIntegrationTaskInput } from '../../../task/types-input/task-integration-task.input-type'
import { TaskIntegrationCreateTaskInput } from '../../../task/types-input/task-integration-task-create.input-type'
import { TaskIntegrationTaskObject } from '../../../task/types-object/task-integration-task.object-type'
import { TaskEffortIntegrationEffortCreateInput } from '../../types-input/task-effort-integration-effort-create.input-type'
import { TaskEffortIntegrationEffortDeleteInput } from '../../types-input/task-effort-integration-effort-delete.input-type'
import { TaskEffortIntegrationEffortUpdateInput } from '../../types-input/task-effort-integration-effort-update.input-type'
import { TaskEffortIntegrationEffortsInput } from '../../types-input/task-effort-integration-efforts.input-type'
import { TaskEffortIntegrationEffortsOutput } from '../../types-output/task-effort-integration-efforts.output-type'
import { setup } from './global-setup'

export class GlobalUtils {
    readonly gqlApiUrl = `http://localhost:9999/graphql`

    private _adminAccessToken = ''
    private _adminAccessTokenExpiresAt = 0

    constructor(private readonly _setup: Awaited<ReturnType<typeof setup>>) {}

    async gqlCreateTaskEffort(
        dto: TaskEffortIntegrationEffortCreateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation createTaskEffort(
                $createTaskEffortInput: TaskEffortIntegrationEffortCreateInput!
            ) {
                createTaskEffort(input: $createTaskEffortInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                createTaskEffortInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlUpdateTaskEffort(
        dto: TaskEffortIntegrationEffortUpdateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation updateTaskEffort(
                $updateTaskEffortInput: TaskEffortIntegrationEffortUpdateInput!
            ) {
                updateTaskEffort(input: $updateTaskEffortInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                updateTaskEffortInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlDeleteTaskEffort(
        dto: TaskEffortIntegrationEffortDeleteInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation deleteTaskEffort(
                $deleteTaskEffortInput: TaskEffortIntegrationEffortDeleteInput!
            ) {
                deleteTaskEffort(input: $deleteTaskEffortInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                deleteTaskEffortInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlTaskEfforts(
        dto: TaskEffortIntegrationEffortsInput,
        accessToken: string,
    ): Promise<{ taskEfforts: TaskEffortIntegrationEffortsOutput }> {
        const doc = gql`
            query taskEfforts(
                $taskEffortsInput: TaskEffortIntegrationEffortsInput!
            ) {
                taskEfforts(input: $taskEffortsInput) {
                    data {
                        id
                        description
                        value
                        taskId
                        user {
                            id
                            firstname
                            lastname
                        }
                        isCanUpdate
                        isCanDelete
                        createdAt
                        updatedAt
                    }
                    meta {
                        curPage
                        perPage
                        total
                    }
                }
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                taskEffortsInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    // -----------------

    async gqlCreateTask(
        dto: TaskIntegrationCreateTaskInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation createTask(
                $createTaskInput: TaskIntegrationCreateTaskInput!
            ) {
                createTask(input: $createTaskInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                createTaskInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlTask(
        dto: TaskIntegrationTaskInput,
    ): Promise<{ task: TaskIntegrationTaskObject }> {
        const doc = gql`
            query task($taskInput: TaskIntegrationTaskInput!) {
                task(input: $taskInput) {
                    id
                    name
                    number
                    description
                    estimatedDateStart
                    estimatedDateEnd
                    estimatedDuration
                    version
                    createdAt
                    effortsMs
                    status {
                        id
                        code
                        name
                    }
                    tags {
                        id
                        code
                        name
                    }
                    createdBy {
                        id
                        firstname
                        lastname
                    }
                    assignedTo {
                        id
                        firstname
                        lastname
                    }
                }
            }
        `

        return await request(this.gqlApiUrl, doc, {
            taskInput: dto,
        })
    }

    async gqlCreateProject(
        dto: ProjectIntegrationCreateProjectInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation createProject(
                $input: ProjectIntegrationCreateProjectInput!
            ) {
                createProject(input: $input)
            }
        `

        return await request(this.gqlApiUrl, doc, { input: dto })
    }

    async gqlProjectTasksStatuses(
        dto: ProjectIntegrationProjectTasksStatusesInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query projectTasksStatuses(
                $projectTasksStatusesInput: ProjectIntegrationProjectTasksStatusesInput!
            ) {
                projectTasksStatuses(input: $projectTasksStatusesInput) {
                    id
                    code
                    name
                    position
                    isDefault
                    description
                }
            }
        `

        return await request(this.gqlApiUrl, doc, {
            projectTasksStatusesInput: dto,
        })
    }

    async gqlGetUsers(
        dto: GetUsersInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query getUsers($input: GetUsersInput!) {
                getUsers(input: $input) {
                    data {
                        id
                        firstname
                        lastname
                        email
                        status
                        createdAt
                        deletedAt
                    }
                    meta {
                        curPage
                        perPage
                        total
                    }
                }
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            { input: dto },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlGetAdminUser(): Promise<{
        adminUser: Record<string, any>
        adminAccessToken: string
    }> {
        const { getUsers } = await this.gqlGetUsers(
            {
                filter: { email: process.env.ADMIN_EMAIL },
            },
            await this.adminGetAccessToken(),
        )

        if (!getUsers.data[0]) {
            throw new Error(`Admin user not found`)
        }

        return {
            adminUser: getUsers.data[0],
            adminAccessToken: this._adminAccessToken,
        }
    }

    async adminGetAccessToken(): Promise<string> {
        if (this._adminAccessTokenExpiresAt - 30 * 1000 > Number(new Date())) {
            return this._adminAccessToken
        }

        const doc = gql`
            mutation signIn($input: SignInInput!) {
                signIn(input: $input) {
                    refreshToken
                    accessToken
                    userId
                    expiresAt
                }
            }
        `

        const result: any = await request(this.gqlApiUrl, doc, {
            input: {
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
            },
        })

        this._adminAccessToken = result.signIn.accessToken
        this._adminAccessTokenExpiresAt = result.signIn.expiresAt

        return this._adminAccessToken
    }
}
