import request, { gql } from 'graphql-request'

import { GetUsersInput } from '../../../../../../../../packages/server/src/lib/modules/auth/interfaces/auth.graphql'
import { ProjectIntegrationCreateProjectInput } from '../../../project/types-input/project-integration-project-create.input-type'
import { ProjectIntegrationProjectTasksRelationsInput } from '../../../project/types-input/project-integration-project-tasks-relations.input-type'
import { ProjectIntegrationProjectTasksStatusesInput } from '../../../project/types-input/project-integration-project-tasks-statuses.input-type'
import { ProjectIntegrationProjectTasksTagsInput } from '../../../project/types-input/project-integration-project-tasks-tags.input-type'
import { TaskIntegrationTaskInput } from '../../types-input/task-integration-task.input-type'
import { TaskIntegrationTaskCreateInput } from '../../types-input/task-integration-task-create.input-type'
import { TaskIntegrationTaskUpdateInput } from '../../types-input/task-integration-task-update.input-type'
import { TaskIntegrationTasksInput } from '../../types-input/task-integration-tasks.input-type'
import { TaskIntegrationTasksOfCurrentUserInput } from '../../types-input/task-integration-tasks-of-current-user.input-type'
import { TaskIntegrationTaskObject } from '../../types-object/task-integration-task.object-type'
import { TaskIntegrationTasksOutput } from '../../types-output/task-integration-tasks.output-type'
import { setup } from './global-setup'

export class GlobalUtils {
    readonly gqlApiUrl = `http://localhost:9999/graphql`

    private _adminAccessToken = ''
    private _adminAccessTokenExpiresAt = 0

    constructor(private readonly _setup: Awaited<ReturnType<typeof setup>>) {}


    async gqlTaskCreate(dto: TaskIntegrationTaskCreateInput, accessToken: string): Promise<Record<string, any>> {
        const doc = gql`
        mutation taskCreate($taskCreateInput: TaskIntegrationTaskCreateInput!) {
            taskCreate(input: $taskCreateInput)
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "taskCreateInput": dto,
        }, {
            Authorization: `Bearer ${accessToken}`
        })
    }

    async gqlTaskUpdate(dto: TaskIntegrationTaskUpdateInput, accessToken: string): Promise<{ taskUpdate: string }> {
        const doc = gql`
        mutation taskUpdate($taskUpdateInput: TaskIntegrationTaskUpdateInput!) {
            taskUpdate(input: $taskUpdateInput)
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "taskUpdateInput": dto,
        }, {
            Authorization: `Bearer ${accessToken}`
        })
    }

    async gqlTask(dto: TaskIntegrationTaskInput): Promise<{ task: TaskIntegrationTaskObject }> {
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
            "taskInput": dto,
        })
    }

    async gqlTasks(dto?: TaskIntegrationTasksInput | null): Promise<{ tasks: TaskIntegrationTasksOutput }> {
        const doc = gql`
        query tasks($tasksInput: TaskIntegrationTasksInput) {
            tasks(input: $tasksInput) {
              data {
                id
                name
                number
                description
                estimatedDateStart
                estimatedDateEnd
                estimatedDuration
                version
                createdAt
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
              meta {
                curPage
                perPage
                total
              }
            }
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "tasksInput": dto,
        })
    }

    async gqlTasksOfCurrentUser(
        dto: TaskIntegrationTasksOfCurrentUserInput | undefined | null,
        accessToken: string
    ): Promise<Record<string, any>> {
        const doc = gql`
        query tasksOfCurrentUser($tasksOfCurrentUserInput: TaskIntegrationTasksOfCurrentUserInput) {
            tasksOfCurrentUser(input: $tasksOfCurrentUserInput) {
              data {
                id
                name
                number
                description
                estimatedDateStart
                estimatedDateEnd
                estimatedDuration
                version
                createdAt
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
              meta {
                curPage
                perPage
                total
              }
            }
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "tasksOfCurrentUserInput": dto,
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

    async gqlProjectTasksTags(dto: ProjectIntegrationProjectTasksTagsInput): Promise<Record<string, any>> {
        const doc = gql`
        query projectTasksTags($projectTasksTagsInput: ProjectIntegrationProjectTasksTagsInput!) {
            projectTasksTags(input: $projectTasksTagsInput) {
                id
                code
                name
                position
                description
            }
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "projectTasksTagsInput": dto,
        })
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

    async gqlProjectTasksRelations(dto: ProjectIntegrationProjectTasksRelationsInput): Promise<Record<string, any>> {
        const doc = gql`
        query projectTasksRelations($projectTasksRelationsInput: ProjectIntegrationProjectTasksRelationsInput!) {
            projectTasksRelations(input: $projectTasksRelationsInput) {
                id
                code
                nameMain
                nameForeign
                position
                description
            }
        }
        `

        return await request(this.gqlApiUrl, doc, {
            "projectTasksRelationsInput": dto,
        })
    }

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
