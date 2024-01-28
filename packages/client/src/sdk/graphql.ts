/* eslint-disable */
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never
      }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
}

export type AuthorizationResponse = {
    __typename?: 'AuthorizationResponse'
    accessToken: Scalars['String']['output']
    adminId: Scalars['String']['output']
    expiresAt: Scalars['Float']['output']
    refreshToken: Scalars['String']['output']
}

export type Mutation = {
    __typename?: 'Mutation'
    signIn: AuthorizationResponse
}

export type MutationSignInArgs = {
    input: SignInInput
}

export type Query = {
    __typename?: 'Query'
    hi: Scalars['String']['output']
}

export type SignInInput = {
    email: Scalars['String']['input']
    password: Scalars['String']['input']
}
