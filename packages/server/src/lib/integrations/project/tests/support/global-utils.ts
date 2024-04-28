import request, { gql } from 'graphql-request'

import { GetUsersInput, SignInInput } from '../../../../../../../../packages/server/src/lib/modules/auth/interfaces/auth.graphql'
import { ProjectIntegrationCreateProjectInput } from '../../types-input/project-integration-project-create.input-type'
import { ProjectIntegrationProjectUsersInput } from '../../types-input/project-integration-project-users.input-type'
import { setup } from './global-setup'

export class GlobalUtils {
    readonly gqlApiUrl = `http://localhost:9999/graphql`

    private _adminAccessToken = ''
    private _adminAccessTokenExpiresAt = 0

    constructor(private readonly _setup: Awaited<ReturnType<typeof setup>>) {}

    async gqlCreateProject(dto: ProjectIntegrationCreateProjectInput): Promise<Record<string, any>> {
        const doc = gql`
            mutation createProject($input: ProjectIntegrationCreateProjectInput!) {
                createProject(input: $input)
            }
        `

        return await request(this.gqlApiUrl, doc, { input: dto })
    }

    async gqlProjects(): Promise<Record<string, any>> {
        const doc = gql`
            query projects {
                projects {
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

        return await request(this.gqlApiUrl, doc)
    }

    async gqlProjectUsers(dto: ProjectIntegrationProjectUsersInput): Promise<Record<string, any>> {
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
