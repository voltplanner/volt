// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Float: number
    ID: string
    String: string
    Boolean: boolean
    DateTime: any
    Upload: any
}

export interface PaginatedMetaType {
    curPage: Scalars['Float']
    perPage: Scalars['Float']
    total: Scalars['Float']
    __typename: 'PaginatedMetaType'
}

export interface MethodsType {
    id: Scalars['ID']
    name: Scalars['String']
    group: Scalars['String']
    editable: Scalars['Boolean']
    description: Scalars['String']
    allowed: Scalars['Boolean']
    __typename: 'MethodsType'
}

export interface RoleType {
    id: Scalars['ID']
    name: Scalars['String']
    editable: Scalars['Boolean']
    superuser: Scalars['Boolean']
    methods: MethodsType[]
    __typename: 'RoleType'
}

export interface PaginatedRoles {
    data: RoleType[]
    meta: PaginatedMetaType
    __typename: 'PaginatedRoles'
}

export interface UserType {
    id: Scalars['ID']
    firstname: Scalars['String']
    lastname: Scalars['String']
    email: Scalars['String']
    status: AuthUserStatusEnum
    createdAt: Scalars['DateTime']
    deletedAt: Scalars['DateTime'] | null
    __typename: 'UserType'
}

export type AuthUserStatusEnum = 'WAITING_COMPLETE' | 'ACTIVE' | 'BLOCKED'

export interface PaginatedUsers {
    data: UserType[]
    meta: PaginatedMetaType
    __typename: 'PaginatedUsers'
}

export interface AuthorizationResponse {
    refreshToken: Scalars['String']
    accessToken: Scalars['String']
    userId: Scalars['ID']
    expiresAt: Scalars['Float']
    __typename: 'AuthorizationResponse'
}

export interface GetNotificationPreferences {
    emailEnabled: Scalars['Boolean']
    email: Scalars['String'] | null
    webEnabled: Scalars['Boolean']
    telegramEnabled: Scalars['Boolean']
    telegramAccount: Scalars['Float'] | null
    __typename: 'GetNotificationPreferences'
}

export interface NotificationWebResponse {
    userId: Scalars['String']
    topic: Scalars['String']
    message: Scalars['String']
    link: Scalars['String'] | null
    __typename: 'NotificationWebResponse'
}

export interface Query {
    getUsers: PaginatedUsers
    getRoles: RoleType[]
    getMyRole: RoleType
    getMyUser: UserType
    getFile: Scalars['String']
    __typename: 'Query'
}

export type OrderEnum = 'ASC' | 'DESC'

export interface Mutation {
    updateRole: Scalars['Boolean']
    changeUserRole: Scalars['Boolean']
    createRole: Scalars['Boolean']
    deleteRole: Scalars['Boolean']
    changePermissions: Scalars['Boolean']
    updateUser: Scalars['Boolean']
    signIn: AuthorizationResponse
    refreshToken: AuthorizationResponse
    createUser: UserType
    deleteUser: Scalars['Boolean']
    completeSignIn: AuthorizationResponse
    uploadFile: Scalars['String']
    __typename: 'Mutation'
}

export interface PaginatedMetaTypeGenqlSelection {
    curPage?: boolean | number
    perPage?: boolean | number
    total?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MethodsTypeGenqlSelection {
    id?: boolean | number
    name?: boolean | number
    group?: boolean | number
    editable?: boolean | number
    description?: boolean | number
    allowed?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoleTypeGenqlSelection {
    id?: boolean | number
    name?: boolean | number
    editable?: boolean | number
    superuser?: boolean | number
    methods?: MethodsTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaginatedRolesGenqlSelection {
    data?: RoleTypeGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserTypeGenqlSelection {
    id?: boolean | number
    firstname?: boolean | number
    lastname?: boolean | number
    email?: boolean | number
    status?: boolean | number
    createdAt?: boolean | number
    deletedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PaginatedUsersGenqlSelection {
    data?: UserTypeGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuthorizationResponseGenqlSelection {
    refreshToken?: boolean | number
    accessToken?: boolean | number
    userId?: boolean | number
    expiresAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GetNotificationPreferencesGenqlSelection {
    emailEnabled?: boolean | number
    email?: boolean | number
    webEnabled?: boolean | number
    telegramEnabled?: boolean | number
    telegramAccount?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NotificationWebResponseGenqlSelection {
    userId?: boolean | number
    topic?: boolean | number
    message?: boolean | number
    link?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection {
    getUsers?: PaginatedUsersGenqlSelection & {
        __args: { input: GetUsersInput }
    }
    getRoles?: RoleTypeGenqlSelection & { __args: { input: GetRolesInput } }
    getMyRole?: RoleTypeGenqlSelection & { __args: { input: GetRolesInput } }
    getMyUser?: UserTypeGenqlSelection
    getFile?: { __args: { input: GetFileInput } }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GetUsersInput {
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
    orderBy?: OrderByInput | null
    filter?: GetUsersFilterInput | null
}

export interface OrderByInput {
    field: Scalars['String']
    order: OrderEnum
}

export interface GetUsersFilterInput {
    email?: Scalars['String'] | null
    firstname?: Scalars['String'] | null
    lastname?: Scalars['String'] | null
    role?: Scalars['String'] | null
    status?: AuthUserStatusEnum | null
}

export interface GetRolesInput {
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
    filter?: GetRolesFilterInput | null
}

export interface GetRolesFilterInput {
    name?: Scalars['String'] | null
}

export interface GetFileInput {
    id: Scalars['String']
}

export interface MutationGenqlSelection {
    updateRole?: { __args: { input: UpdateRoleInput } }
    changeUserRole?: { __args: { input: ChangeUserRoleInput } }
    createRole?: { __args: { input: CreateRoleInput } }
    deleteRole?: { __args: { input: DeleteRoleInput } }
    changePermissions?: { __args: { input: ChangePermissionsInput } }
    updateUser?: { __args: { input: UpdateUserInput } }
    signIn?: AuthorizationResponseGenqlSelection & {
        __args: { input: SignInInput }
    }
    refreshToken?: AuthorizationResponseGenqlSelection & {
        __args: { input: RefreshTokenInput }
    }
    createUser?: UserTypeGenqlSelection & { __args: { input: CreateUserInput } }
    deleteUser?: { __args: { input: DeleteUserInput } }
    completeSignIn?: AuthorizationResponseGenqlSelection & {
        __args: { input: CompleteSignInInput }
    }
    uploadFile?: { __args: { input: UploadFileInput } }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdateRoleInput {
    roleId: Scalars['ID']
    name?: Scalars['String'] | null
    superuser?: Scalars['Boolean'] | null
    editable?: Scalars['Boolean'] | null
}

export interface ChangeUserRoleInput {
    userId: Scalars['ID']
    roleName: Scalars['String']
}

export interface CreateRoleInput {
    name: Scalars['String']
}

export interface DeleteRoleInput {
    roleId: Scalars['ID']
}

export interface ChangePermissionsInput {
    roleId: Scalars['ID']
    permissions: PermissionInput[]
}

export interface PermissionInput {
    methodId: Scalars['ID']
    allow: Scalars['Boolean']
}

export interface UpdateUserInput {
    userId: Scalars['ID']
    email?: Scalars['String'] | null
    firstname?: Scalars['String'] | null
    lastname?: Scalars['String'] | null
    password?: Scalars['String'] | null
    role?: Scalars['String'] | null
    status?: AuthUserStatusEnum | null
}

export interface SignInInput {
    email: Scalars['String']
    password: Scalars['String']
}

export interface RefreshTokenInput {
    refreshToken: Scalars['String']
}

export interface CreateUserInput {
    email: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    roleName: Scalars['String']
}

export interface DeleteUserInput {
    userId: Scalars['ID']
}

export interface CompleteSignInInput {
    userId: Scalars['ID']
    code: Scalars['String']
    password: Scalars['String']
}

export interface UploadFileInput {
    file: Scalars['Upload']
}

const PaginatedMetaType_possibleTypes: string[] = ['PaginatedMetaType']
export const isPaginatedMetaType = (
    obj?: { __typename?: any } | null,
): obj is PaginatedMetaType => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isPaginatedMetaType"')
    return PaginatedMetaType_possibleTypes.includes(obj.__typename)
}

const MethodsType_possibleTypes: string[] = ['MethodsType']
export const isMethodsType = (
    obj?: { __typename?: any } | null,
): obj is MethodsType => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isMethodsType"')
    return MethodsType_possibleTypes.includes(obj.__typename)
}

const RoleType_possibleTypes: string[] = ['RoleType']
export const isRoleType = (
    obj?: { __typename?: any } | null,
): obj is RoleType => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isRoleType"')
    return RoleType_possibleTypes.includes(obj.__typename)
}

const PaginatedRoles_possibleTypes: string[] = ['PaginatedRoles']
export const isPaginatedRoles = (
    obj?: { __typename?: any } | null,
): obj is PaginatedRoles => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isPaginatedRoles"')
    return PaginatedRoles_possibleTypes.includes(obj.__typename)
}

const UserType_possibleTypes: string[] = ['UserType']
export const isUserType = (
    obj?: { __typename?: any } | null,
): obj is UserType => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isUserType"')
    return UserType_possibleTypes.includes(obj.__typename)
}

const PaginatedUsers_possibleTypes: string[] = ['PaginatedUsers']
export const isPaginatedUsers = (
    obj?: { __typename?: any } | null,
): obj is PaginatedUsers => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isPaginatedUsers"')
    return PaginatedUsers_possibleTypes.includes(obj.__typename)
}

const AuthorizationResponse_possibleTypes: string[] = ['AuthorizationResponse']
export const isAuthorizationResponse = (
    obj?: { __typename?: any } | null,
): obj is AuthorizationResponse => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isAuthorizationResponse"')
    return AuthorizationResponse_possibleTypes.includes(obj.__typename)
}

const GetNotificationPreferences_possibleTypes: string[] = [
    'GetNotificationPreferences',
]
export const isGetNotificationPreferences = (
    obj?: { __typename?: any } | null,
): obj is GetNotificationPreferences => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isGetNotificationPreferences"',
        )
    return GetNotificationPreferences_possibleTypes.includes(obj.__typename)
}

const NotificationWebResponse_possibleTypes: string[] = [
    'NotificationWebResponse',
]
export const isNotificationWebResponse = (
    obj?: { __typename?: any } | null,
): obj is NotificationWebResponse => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isNotificationWebResponse"')
    return NotificationWebResponse_possibleTypes.includes(obj.__typename)
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

export const enumAuthUserStatusEnum = {
    WAITING_COMPLETE: 'WAITING_COMPLETE' as const,
    ACTIVE: 'ACTIVE' as const,
    BLOCKED: 'BLOCKED' as const,
}

export const enumOrderEnum = {
    ASC: 'ASC' as const,
    DESC: 'DESC' as const,
}
