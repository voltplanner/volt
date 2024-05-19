import request, { gql } from 'graphql-request'

import {
    GetUsersInput,
    SignInInput,
} from '../../../../../../../../packages/server/src/lib/modules/auth/interfaces/auth.graphql'
import { ProjectIntegrationProjectInput } from '../../types-input/project-integration-project.input-type'
import { ProjectIntegrationCreateProjectInput } from '../../types-input/project-integration-project-create.input-type'
import { ProjectIntegrationProjectTasksRelationsInput } from '../../types-input/project-integration-project-tasks-relations.input-type'
import { ProjectIntegrationProjectTasksStatusesInput } from '../../types-input/project-integration-project-tasks-statuses.input-type'
import { ProjectIntegrationProjectTasksTagsInput } from '../../types-input/project-integration-project-tasks-tags.input-type'
import { ProjectIntegrationProjectUpdateInput } from '../../types-input/project-integration-project-update.input-type'
import { ProjectIntegrationProjectUsersInput } from '../../types-input/project-integration-project-users.input-type'
import { ProjectIntegrationProjectUsersRolesInput } from '../../types-input/project-integration-project-users-roles.input-type'
import { ProjectIntegrationProjectsInput } from '../../types-input/project-integration-projects.input-type'
import { setup } from './global-setup'

export class GlobalUtils {
    readonly gqlApiUrl = `http://localhost:9999/graphql`

    private _adminAccessToken = ''
    private _adminAccessTokenExpiresAt = 0

    constructor(private readonly _setup: Awaited<ReturnType<typeof setup>>) {}

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

    async gqlUpdateProject(
        dto: ProjectIntegrationProjectUpdateInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            mutation updateProject(
                $updateProjectInput: ProjectIntegrationProjectUpdateInput!
            ) {
                updateProject(input: $updateProjectInput)
            }
        `

        return await request(this.gqlApiUrl, doc, {
            updateProjectInput: dto,
        })
    }

    async gqlProject(
        dto: ProjectIntegrationProjectInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query project($projectInput: ProjectIntegrationProjectInput!) {
                project(input: $projectInput) {
                    id
                    name
                    description
                    deadline
                    budget
                    version
                    createdAt
                }
            }
        `

        return await request(this.gqlApiUrl, doc, {
            projectInput: dto,
        })
    }

    async gqlProjects(
        dto?: ProjectIntegrationProjectsInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query projects${
                dto ? '($projectsInput: ProjectIntegrationProjectsInput!)' : ''
            } {
                projects${dto ? '(input: $projectsInput)' : ''} {
                    data {
                        id
                        name
                        description
                        deadline
                        budget
                        version
                        createdAt
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
            projectsInput: dto,
        })
    }

    async gqlProjectsOfCurrentUser(
        accessToken: string,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query projectsOfCurrentUser {
                projectsOfCurrentUser {
                    data {
                        id
                        name
                        description
                        deadline
                        budget
                        version
                        createdAt
                    }
                    meta {
                        curPage
                        perPage
                        total
                    }
                }
            }
        `

        return await request(this.gqlApiUrl, doc, undefined, {
            Authorization: `Bearer ${accessToken}`,
        })
    }

    async gqlProjectUsers(
        dto: ProjectIntegrationProjectUsersInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query projectUsers($input: ProjectIntegrationProjectUsersInput!) {
                projectUsers(input: $input) {
                    data {
                        id
                        firstname
                        lastname
                    }
                    meta {
                        curPage
                        perPage
                        total
                    }
                }
            }
        `

        return await request(this.gqlApiUrl, doc, { input: dto })
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

    async gqlProjectUsersRoles(
        dto: ProjectIntegrationProjectUsersRolesInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query projectUsersRoles(
                $projectUsersRolesInput: ProjectIntegrationProjectUsersRolesInput!
            ) {
                projectUsersRoles(input: $projectUsersRolesInput) {
                    id
                    code
                    name
                    position
                    description
                }
            }
        `

        return await request(this.gqlApiUrl, doc, {
            projectUsersRolesInput: dto,
        })
    }

    async gqlProjectTasksTags(
        dto: ProjectIntegrationProjectTasksTagsInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query projectTasksTags(
                $projectTasksTagsInput: ProjectIntegrationProjectTasksTagsInput!
            ) {
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
            projectTasksTagsInput: dto,
        })
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

    async gqlProjectTasksRelations(
        dto: ProjectIntegrationProjectTasksRelationsInput,
    ): Promise<Record<string, any>> {
        const doc = gql`
            query projectTasksRelations(
                $projectTasksRelationsInput: ProjectIntegrationProjectTasksRelationsInput!
            ) {
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
            projectTasksRelationsInput: dto,
        })
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
