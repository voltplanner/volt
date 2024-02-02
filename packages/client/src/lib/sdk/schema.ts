// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Float: number,
    String: string,
    ID: string,
    Boolean: boolean,
    DateTime: any,
}

export interface PaginatedMetaType {
    curPage: Scalars['Float']
    perPage: Scalars['Float']
    total: Scalars['Float']
    __typename: 'PaginatedMetaType'
}

export interface AuthorizationResponse {
    refreshToken: Scalars['String']
    accessToken: Scalars['String']
    userId: Scalars['String']
    expiresAt: Scalars['Float']
    __typename: 'AuthorizationResponse'
}

export interface RoleType {
    id: Scalars['ID']
    name: Scalars['String']
    editable: Scalars['Boolean']
    superuser: Scalars['Boolean']
    __typename: 'RoleType'
}

export interface MethodsType {
    id: Scalars['ID']
    name: Scalars['String']
    group: Scalars['String']
    description: Scalars['String']
    allowed: Scalars['Boolean']
    __typename: 'MethodsType'
}

export interface AvailableMethodsType {
    id: Scalars['ID']
    name: Scalars['String']
    editable: Scalars['Boolean']
    superuser: Scalars['Boolean']
    methods: MethodsType[]
    __typename: 'AvailableMethodsType'
}

export interface UserType {
    id: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    email: Scalars['String']
    role: RoleType
    status: AuthUserStatusEnum
    createdAt: Scalars['DateTime']
    deletedAt: (Scalars['DateTime'] | null)
    __typename: 'UserType'
}

export type AuthUserStatusEnum = 'WAITING_COMPLETE' | 'ACTIVE' | 'BLOCKED'

export interface PaginatedUsers {
    data: UserType[]
    meta: PaginatedMetaType
    __typename: 'PaginatedUsers'
}

export interface Query {
    getUsers: PaginatedUsers
    getRoleAvailableMethods: AvailableMethodsType
    getRoles: RoleType[]
    __typename: 'Query'
}

export type OrderEnum = 'ASC' | 'DESC'

export interface Mutation {
    changePermissions: Scalars['Boolean']
    updateUser: UserType
    signIn: AuthorizationResponse
    createUser: UserType
    completeSignIn: AuthorizationResponse
    __typename: 'Mutation'
}

export interface PaginatedMetaTypeGenqlSelection{
    curPage?: boolean | number
    perPage?: boolean | number
    total?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuthorizationResponseGenqlSelection{
    refreshToken?: boolean | number
    accessToken?: boolean | number
    userId?: boolean | number
    expiresAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoleTypeGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    editable?: boolean | number
    superuser?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MethodsTypeGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    group?: boolean | number
    description?: boolean | number
    allowed?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AvailableMethodsTypeGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    editable?: boolean | number
    superuser?: boolean | number
    methods?: MethodsTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserTypeGenqlSelection{
    id?: boolean | number
    firstname?: boolean | number
    lastname?: boolean | number
    email?: boolean | number
    role?: RoleTypeGenqlSelection
    status?: boolean | number
    createdAt?: boolean | number
    deletedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaginatedUsersGenqlSelection{
    data?: UserTypeGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    getUsers?: (PaginatedUsersGenqlSelection & { __args: {input: GetUsersInput} })
    getRoleAvailableMethods?: (AvailableMethodsTypeGenqlSelection & { __args: {input: GetAvailableMethodsInput} })
    getRoles?: (RoleTypeGenqlSelection & { __args: {input: GetRolesInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GetUsersInput {curPage?: (Scalars['Float'] | null),perPage?: (Scalars['Float'] | null),orderBy?: (OrderByInput | null),filter?: (GetUsersFilterInput | null)}

export interface OrderByInput {field: Scalars['String'],order: OrderEnum}

export interface GetUsersFilterInput {email?: (Scalars['String'] | null),firstname?: (Scalars['String'] | null),lastname?: (Scalars['String'] | null),role?: (Scalars['String'] | null),status?: (AuthUserStatusEnum | null)}

export interface GetAvailableMethodsInput {name: Scalars['String'],groups?: (Scalars['String'][] | null)}

export interface GetRolesInput {name?: (Scalars['String'] | null)}

export interface MutationGenqlSelection{
    changePermissions?: { __args: {input: ChangePermissionsInput} }
    updateUser?: (UserTypeGenqlSelection & { __args: {input: UpdateUserInput} })
    signIn?: (AuthorizationResponseGenqlSelection & { __args: {input: SignInInput} })
    createUser?: (UserTypeGenqlSelection & { __args: {input: CreateUserInput} })
    completeSignIn?: (AuthorizationResponseGenqlSelection & { __args: {input: CompleteSignInInput} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ChangePermissionsInput {roleId: Scalars['String'],permissions: PermissionInput[]}

export interface PermissionInput {methodId: Scalars['String'],allow: Scalars['Boolean']}

export interface UpdateUserInput {userId: Scalars['ID'],email?: (Scalars['String'] | null),firstname?: (Scalars['String'] | null),lastname?: (Scalars['String'] | null),password?: (Scalars['String'] | null),role?: (Scalars['String'] | null),status?: (AuthUserStatusEnum | null)}

export interface SignInInput {email: Scalars['String'],password: Scalars['String']}

export interface CreateUserInput {email: Scalars['String'],firstname: Scalars['String'],lastname: Scalars['String'],roleName: Scalars['String']}

export interface CompleteSignInInput {userId: Scalars['String'],code: Scalars['String'],password: Scalars['String']}


    const PaginatedMetaType_possibleTypes: string[] = ['PaginatedMetaType']
    export const isPaginatedMetaType = (obj?: { __typename?: any } | null): obj is PaginatedMetaType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaginatedMetaType"')
      return PaginatedMetaType_possibleTypes.includes(obj.__typename)
    }
    


    const AuthorizationResponse_possibleTypes: string[] = ['AuthorizationResponse']
    export const isAuthorizationResponse = (obj?: { __typename?: any } | null): obj is AuthorizationResponse => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuthorizationResponse"')
      return AuthorizationResponse_possibleTypes.includes(obj.__typename)
    }
    


    const RoleType_possibleTypes: string[] = ['RoleType']
    export const isRoleType = (obj?: { __typename?: any } | null): obj is RoleType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRoleType"')
      return RoleType_possibleTypes.includes(obj.__typename)
    }
    


    const MethodsType_possibleTypes: string[] = ['MethodsType']
    export const isMethodsType = (obj?: { __typename?: any } | null): obj is MethodsType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMethodsType"')
      return MethodsType_possibleTypes.includes(obj.__typename)
    }
    


    const AvailableMethodsType_possibleTypes: string[] = ['AvailableMethodsType']
    export const isAvailableMethodsType = (obj?: { __typename?: any } | null): obj is AvailableMethodsType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAvailableMethodsType"')
      return AvailableMethodsType_possibleTypes.includes(obj.__typename)
    }
    


    const UserType_possibleTypes: string[] = ['UserType']
    export const isUserType = (obj?: { __typename?: any } | null): obj is UserType => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserType"')
      return UserType_possibleTypes.includes(obj.__typename)
    }
    


    const PaginatedUsers_possibleTypes: string[] = ['PaginatedUsers']
    export const isPaginatedUsers = (obj?: { __typename?: any } | null): obj is PaginatedUsers => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPaginatedUsers"')
      return PaginatedUsers_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    

export const enumAuthUserStatusEnum = {
   WAITING_COMPLETE: 'WAITING_COMPLETE' as const,
   ACTIVE: 'ACTIVE' as const,
   BLOCKED: 'BLOCKED' as const
}

export const enumOrderEnum = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const
}
