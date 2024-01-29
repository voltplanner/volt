// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    String: string
    Float: number
    Boolean: boolean
}

export interface AuthorizationResponse {
    refreshToken: Scalars['String']
    accessToken: Scalars['String']
    userId: Scalars['String']
    expiresAt: Scalars['Float']
    __typename: 'AuthorizationResponse'
}

export interface User {
    id: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    __typename: 'User'
}

export interface Query {
    hi: Scalars['String']
    __typename: 'Query'
}

export interface Mutation {
    signIn: AuthorizationResponse
    createUser: User
    completeSignIn: AuthorizationResponse
    __typename: 'Mutation'
}

export type AuthUserRoleEnum = 'MEMBER' | 'ADMIN' | 'OWNER'

export interface AuthorizationResponseGenqlSelection {
    refreshToken?: boolean | number
    accessToken?: boolean | number
    userId?: boolean | number
    expiresAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserGenqlSelection {
    id?: boolean | number
    firstname?: boolean | number
    lastname?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection {
    hi?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection {
    signIn?: AuthorizationResponseGenqlSelection & {
        __args: { input: SignInInput }
    }
    createUser?: UserGenqlSelection & { __args: { input: CreateUserInput } }
    completeSignIn?: AuthorizationResponseGenqlSelection & {
        __args: { input: CompleteSignInInput }
    }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SignInInput {
    email: Scalars['String']
    password: Scalars['String']
}

export interface CreateUserInput {
    email: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    role: AuthUserRoleEnum
}

export interface CompleteSignInInput {
    userId: Scalars['String']
    code: Scalars['String']
    password: Scalars['String']
}

const AuthorizationResponse_possibleTypes: string[] = ['AuthorizationResponse']
export const isAuthorizationResponse = (
    obj?: { __typename?: any } | null,
): obj is AuthorizationResponse => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isAuthorizationResponse"')
    return AuthorizationResponse_possibleTypes.includes(obj.__typename)
}

const User_possibleTypes: string[] = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
    return User_possibleTypes.includes(obj.__typename)
}

const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
    return Query_possibleTypes.includes(obj.__typename)
}

const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (
    obj?: { __typename?: any } | null,
): obj is Mutation => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isMutation"')
    return Mutation_possibleTypes.includes(obj.__typename)
}

export const enumAuthUserRoleEnum = {
    MEMBER: 'MEMBER' as const,
    ADMIN: 'ADMIN' as const,
    OWNER: 'OWNER' as const,
}
