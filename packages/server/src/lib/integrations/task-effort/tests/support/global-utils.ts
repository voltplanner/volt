import request, { gql } from 'graphql-request'

import { GetUsersInput } from '../../../../../../../../packages/server/src/lib/modules/auth/interfaces/auth.graphql'
import { ProjectIntegrationCreateProjectInput } from '../../../project/types-input/project-integration-project-create.input-type'
import { ProjectIntegrationProjectTasksStatusesInput } from '../../../project/types-input/project-integration-project-tasks-statuses.input-type'
import { TaskIntegrationTaskInput } from '../../../task/types-input/task-integration-task.input-type'
import { TaskIntegrationTaskCreateInput } from '../../../task/types-input/task-integration-task-create.input-type'
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

    async gqlTaskEffortCreate(
        dto: TaskEffortIntegrationEffortCreateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation taskEffortCreate(
                $taskEffortCreateInput: TaskEffortIntegrationEffortCreateInput!
            ) {
                taskEffortCreate(input: $taskEffortCreateInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                taskEffortCreateInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlTaskEffortUpdate(
        dto: TaskEffortIntegrationEffortUpdateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation taskEffortUpdate(
                $taskEffortUpdateInput: TaskEffortIntegrationEffortUpdateInput!
            ) {
                taskEffortUpdate(input: $taskEffortUpdateInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                taskEffortUpdateInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlTaskEffortDelete(
        dto: TaskEffortIntegrationEffortDeleteInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation taskEffortDelete(
                $taskEffortDeleteInput: TaskEffortIntegrationEffortDeleteInput!
            ) {
                taskEffortDelete(input: $taskEffortDeleteInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                taskEffortDeleteInput: dto,
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

    async gqlTaskCreate(
        dto: TaskIntegrationTaskCreateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation taskCreate(
                $taskCreateInput: TaskIntegrationTaskCreateInput!
            ) {
                taskCreate(input: $taskCreateInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                taskCreateInput: dto,
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
