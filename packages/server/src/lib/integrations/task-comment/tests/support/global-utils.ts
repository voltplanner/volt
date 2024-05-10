import request, { gql } from 'graphql-request'

import { GetUsersInput } from '../../../../../../../../packages/server/src/lib/modules/auth/interfaces/auth.graphql'
import { ProjectIntegrationCreateProjectInput } from '../../../project/types-input/project-integration-project-create.input-type'
import { ProjectIntegrationProjectTasksRelationsInput } from '../../../project/types-input/project-integration-project-tasks-relations.input-type'
import { ProjectIntegrationProjectTasksStatusesInput } from '../../../project/types-input/project-integration-project-tasks-statuses.input-type'
import { ProjectIntegrationProjectTasksTagsInput } from '../../../project/types-input/project-integration-project-tasks-tags.input-type'
import { TaskIntegrationTaskCreateInput } from '../../../task/types-input/task-integration-task-create.input-type'
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


    async gqlTaskCommentCreate(
        dto: TaskCommentIntegrationCommentCreateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
        mutation taskCommentCreate($taskCommentCreateInput: TaskCommentIntegrationCommentCreateInput!) {
            taskCommentCreate(input: $taskCommentCreateInput)
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "taskCommentCreateInput": dto,
        }, {
            Authorization: `Bearer ${accessToken}`
        })
    }

    async gqlTaskCommentUpdate(
        dto: TaskCommentIntegrationCommentUpdateInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
        mutation taskCommentUpdate($taskCommentUpdateInput: TaskCommentIntegrationCommentUpdateInput!) {
            taskCommentUpdate(input: $taskCommentUpdateInput)
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "taskCommentUpdateInput": dto,
        }, {
            Authorization: `Bearer ${accessToken}`
        })
    }

    async gqlTaskCommentDelete(
        dto: TaskCommentIntegrationCommentDeleteInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
        mutation taskCommentDelete($taskCommentDeleteInput: TaskCommentIntegrationCommentDeleteInput!) {
            taskCommentDelete(input: $taskCommentDeleteInput)
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "taskCommentDeleteInput": dto,
        }, {
            Authorization: `Bearer ${accessToken}`
        })
    }

    async gqlTaskComments(
        dto: TaskCommentIntegrationCommentsInput,
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
        query taskComments($taskCommentsInput: TaskCommentIntegrationCommentsInput!) {
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
                isCanEdit
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

        return await request(this.gqlApiUrl, doc, {
            "taskCommentsInput": dto,
        }, {
            Authorization: `Bearer ${accessToken}`
        })
    }

    async gqlCreateTask(dto: TaskIntegrationTaskCreateInput, accessToken: string): Promise<Record<string, any>> {
        const doc = gql`
        mutation createTask($createTaskInput: TaskIntegrationTaskCreateInput!) {
            createTask(input: $createTaskInput)
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "createTaskInput": dto,
        }, {
            Authorization: `Bearer ${accessToken}`
        })
    }

    // Project Integration
    async gqlCreateProject(dto: ProjectIntegrationCreateProjectInput): Promise<Record<string, any>> {
        const doc = gql`
            mutation createProject($input: ProjectIntegrationCreateProjectInput!) {
                createProject(input: $input)
            }
        `

        return await request(this.gqlApiUrl, doc, { input: dto })
    }

    async gqlProjectTasksStatuses(dto: ProjectIntegrationProjectTasksStatusesInput): Promise<Record<string, any>> {
        const doc = gql`
        query projectTasksStatuses($projectTasksStatusesInput: ProjectIntegrationProjectTasksStatusesInput!) {
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
            "projectTasksStatusesInput": dto,
        })
    }










    // async gqlUpdateTask(dto: TaskIntegrationTaskUpdateInput, accessToken: string): Promise<Record<string, any>> {
    //     const doc = gql`
    //     mutation updateTask($updateTaskInput: TaskIntegrationTaskUpdateInput!) {
    //         updateTask(input: $updateTaskInput)
    //     }
    //     `

    //     return await request(this.gqlApiUrl, doc, {
    //         "updateTaskInput": dto,
    //     }, {
    //         Authorization: `Bearer ${accessToken}`
    //     })
    // }

    // async gqlTask(dto: TaskIntegrationTaskInput): Promise<Record<string, any>> {
    //     const doc = gql`
    //     query task($taskInput: TaskIntegrationTaskInput!) {
    //         task(input: $taskInput) {
    //             id
    //             name
    //             number
    //             description
    //             estimatedDateStart
    //             estimatedDateEnd
    //             estimatedDuration
    //             version
    //             createdAt
    //             status {
    //                 id
    //                 code
    //                 name
    //             }
    //             tags {
    //                 id
    //                 code
    //                 name
    //             }
    //             createdBy {
    //                 id
    //                 firstname
    //                 lastname
    //             }
    //             assignedTo {
    //                 id
    //                 firstname
    //                 lastname
    //             }
    //         }
    //     }
    //     `

    //     return await request(this.gqlApiUrl, doc, {
    //         "taskInput": dto,
    //     })
    // }

    // async gqlTasks(dto?: TaskIntegrationTasksInput | null): Promise<Record<string, any>> {
    //     const doc = gql`
    //     query tasks($tasksInput: TaskIntegrationTasksInput) {
    //         tasks(input: $tasksInput) {
    //           data {
    //             id
    //             name
    //             number
    //             description
    //             estimatedDateStart
    //             estimatedDateEnd
    //             estimatedDuration
    //             version
    //             createdAt
    //             status {
    //               id
    //               code
    //               name
    //             }
    //             tags {
    //               id
    //               code
    //               name
    //             }
    //             createdBy {
    //               id
    //               firstname
    //               lastname
    //             }
    //             assignedTo {
    //               id
    //               firstname
    //               lastname
    //             }
    //           }
    //           meta {
    //             curPage
    //             perPage
    //             total
    //           }
    //         }
    //     }
    //     `

    //     return await request(this.gqlApiUrl, doc, {
    //         "tasksInput": dto,
    //     })
    // }

    // async gqlTasksOfCurrentUser(
    //     dto: TaskIntegrationTasksOfCurrentUserInput | undefined | null,
    //     accessToken: string
    // ): Promise<Record<string, any>> {
    //     const doc = gql`
    //     query tasksOfCurrentUser($tasksOfCurrentUserInput: TaskIntegrationTasksOfCurrentUserInput) {
    //         tasksOfCurrentUser(input: $tasksOfCurrentUserInput) {
    //           data {
    //             id
    //             name
    //             number
    //             description
    //             estimatedDateStart
    //             estimatedDateEnd
    //             estimatedDuration
    //             version
    //             createdAt
    //             status {
    //               id
    //               code
    //               name
    //             }
    //             tags {
    //               id
    //               code
    //               name
    //             }
    //             createdBy {
    //               id
    //               firstname
    //               lastname
    //             }
    //             assignedTo {
    //               id
    //               firstname
    //               lastname
    //             }
    //           }
    //           meta {
    //             curPage
    //             perPage
    //             total
    //           }
    //         }
    //     }
    //     `

    //     return await request(this.gqlApiUrl, doc, {
    //         "tasksOfCurrentUserInput": dto,
    //     }, {
    //         Authorization: `Bearer ${accessToken}`
    //     })
    // }



    // async gqlProjectTasksTags(dto: ProjectIntegrationProjectTasksTagsInput): Promise<Record<string, any>> {
    //     const doc = gql`
    //     query projectTasksTags($projectTasksTagsInput: ProjectIntegrationProjectTasksTagsInput!) {
    //         projectTasksTags(input: $projectTasksTagsInput) {
    //             id
    //             code
    //             name
    //             position
    //             description
    //         }
    //     }
    //     `

    //     return await request(this.gqlApiUrl, doc, {
    //         "projectTasksTagsInput": dto,
    //     })
    // }





    // async gqlProjectTasksRelations(dto: ProjectIntegrationProjectTasksRelationsInput): Promise<Record<string, any>> {
    //     const doc = gql`
    //     query projectTasksRelations($projectTasksRelationsInput: ProjectIntegrationProjectTasksRelationsInput!) {
    //         projectTasksRelations(input: $projectTasksRelationsInput) {
    //             id
    //             code
    //             nameMain
    //             nameForeign
    //             position
    //             description
    //         }
    //     }
    //     `

    //     return await request(this.gqlApiUrl, doc, {
    //         "projectTasksRelationsInput": dto,
    //     })
    // }

    async gqlGetUsers(dto: GetUsersInput, accessToken: string): Promise<Record<string, any>> {
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

        return await request(this.gqlApiUrl, doc, { input: dto }, {
            Authorization: `Bearer ${accessToken}`
        })
    }
    
    async gqlGetAdminUser(): Promise<{ adminUser: Record<string, any>, adminAccessToken: string }> {
        const { getUsers } = await this.gqlGetUsers({
            filter: { email: process.env.ADMIN_EMAIL },
        }, await this.adminGetAccessToken())
        
        if (!getUsers.data[0]) {
            throw new Error(`Admin user not found`)
        }

        return {
            adminUser: getUsers.data[0],
            adminAccessToken: this._adminAccessToken,
        }
    }

    async adminGetAccessToken(): Promise<string> {
        if ((this._adminAccessTokenExpiresAt - 30 * 1000) > Number(new Date())) {
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
