import request, { gql } from 'graphql-request'

import { GetUsersInput } from '../../../../../../../../packages/server/src/lib/modules/auth/interfaces/auth.graphql'
import { ProjectIntegrationCreateProjectInput } from '../../../project/types-input/project-integration-project-create.input-type'
import { ProjectIntegrationProjectTasksStatusesInput } from '../../../project/types-input/project-integration-project-tasks-statuses.input-type'
import { TaskIntegrationCreateTaskInput } from '../../../task/types-input/task-integration-task-create.input-type'
import { TaskCommentIntegrationCommentCreateInput } from '../../types-input/task-comment-integration-comment-create.input-type'
import { TaskCommentIntegrationCommentDeleteInput } from '../../types-input/task-comment-integration-comment-delete.input-type'
import { TaskCommentIntegrationCommentUpdateInput } from '../../types-input/task-comment-integration-comment-update.input-type'
import { TaskCommentIntegrationCommentsInput } from '../../types-input/task-comment-integration-comments.input-type'
import { setup } from './global-setup'

export class GlobalUtils {
    readonly gqlApiUrl = `http://localhost:9999/graphql`

    private _adminAccessToken = ''
    private _adminAccessTokenExpiresAt = 0

    constructor(private readonly _setup: Awaited<ReturnType<typeof setup>>) {}

    async gqlCreateTaskComment(
        dto: TaskCommentIntegrationCommentCreateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation createTaskComment(
                $createTaskCommentInput: TaskCommentIntegrationCommentCreateInput!
            ) {
                createTaskComment(input: $createTaskCommentInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                createTaskCommentInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlUpdateTaskComment(
        dto: TaskCommentIntegrationCommentUpdateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation updateTaskComment(
                $updateTaskCommentInput: TaskCommentIntegrationCommentUpdateInput!
            ) {
                updateTaskComment(input: $updateTaskCommentInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                updateTaskCommentInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlDeleteTaskComment(
        dto: TaskCommentIntegrationCommentDeleteInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation deleteTaskComment(
                $deleteTaskCommentInput: TaskCommentIntegrationCommentDeleteInput!
            ) {
                deleteTaskComment(input: $deleteTaskCommentInput)
            }
        `

        return await request(
            this.gqlApiUrl,
            doc,
            {
                deleteTaskCommentInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

    async gqlTaskComments(
        dto: TaskCommentIntegrationCommentsInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query taskComments(
                $taskCommentsInput: TaskCommentIntegrationCommentsInput!
            ) {
                taskComments(input: $taskCommentsInput) {
                    data {
                        id
                        text
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
                taskCommentsInput: dto,
            },
            {
                Authorization: `Bearer ${accessToken}`,
            },
        )
    }

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

    // Project Integration
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
