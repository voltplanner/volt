// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Float: number
    String: string
    Boolean: boolean
    ID: string
    DateTime: any
    Upload: any
}

export interface PaginatedMetaType {
    curPage: Scalars['Float']
    perPage: Scalars['Float']
    total: Scalars['Float']
    __typename: 'PaginatedMetaType'
}

export interface ProjectIntegrationTasksRelationObject {
    id: Scalars['String']
    code: Scalars['String']
    nameMain: Scalars['String']
    nameForeign: Scalars['String']
    position: Scalars['Float']
    description: Scalars['String'] | null
    __typename: 'ProjectIntegrationTasksRelationObject'
}

export interface ProjectIntegrationTasksStatusObject {
    id: Scalars['String']
    code: Scalars['String']
    name: Scalars['String']
    position: Scalars['Float']
    isDefault: Scalars['Boolean']
    description: Scalars['String'] | null
    __typename: 'ProjectIntegrationTasksStatusObject'
}

export interface ProjectIntegrationTasksTagObject {
    id: Scalars['String']
    code: Scalars['String']
    name: Scalars['String']
    position: Scalars['Float']
    description: Scalars['String'] | null
    __typename: 'ProjectIntegrationTasksTagObject'
}

export interface ProjectIntegrationUsersRoleObject {
    id: Scalars['String']
    code: Scalars['String']
    name: Scalars['String']
    position: Scalars['Float']
    description: Scalars['String'] | null
    __typename: 'ProjectIntegrationUsersRoleObject'
}

export interface ProjectIntegrationUserObject {
    id: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    __typename: 'ProjectIntegrationUserObject'
}

export interface ProjectIntegrationProjectUsersOutput {
    data: ProjectIntegrationUserObject[]
    meta: PaginatedMetaType
    __typename: 'ProjectIntegrationProjectUsersOutput'
}

export interface ProjectIntegrationProjectObject {
    id: Scalars['String']
    name: Scalars['String']
    description: Scalars['String'] | null
    deadline: Scalars['Float'] | null
    budget: Scalars['Float'] | null
    version: Scalars['Float']
    createdAt: Scalars['Float']
    __typename: 'ProjectIntegrationProjectObject'
}

export interface ProjectIntegrationProjectsOutput {
    data: ProjectIntegrationProjectObject[]
    meta: PaginatedMetaType
    __typename: 'ProjectIntegrationProjectsOutput'
}

export interface ProjectIntegrationProjectsOfCurrentUserOutput {
    data: ProjectIntegrationProjectObject[]
    meta: PaginatedMetaType
    __typename: 'ProjectIntegrationProjectsOfCurrentUserOutput'
}

export interface TaskIntegrationUserObject {
    id: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    __typename: 'TaskIntegrationUserObject'
}

export interface TaskIntegrationTaskObject {
    id: Scalars['String']
    name: Scalars['String']
    number: Scalars['Float']
    description: Scalars['String'] | null
    estimatedDateStart: Scalars['Float'] | null
    estimatedDateEnd: Scalars['Float'] | null
    estimatedDuration: Scalars['Float'] | null
    version: Scalars['Float']
    createdAt: Scalars['Float']
    status: Scalars['String']
    createdBy: TaskIntegrationUserObject
    assignedTo: TaskIntegrationUserObject | null
    __typename: 'TaskIntegrationTaskObject'
}

export interface TaskIntegrationTasksOutput {
    data: TaskIntegrationTaskObject[]
    meta: PaginatedMetaType
    __typename: 'TaskIntegrationTasksOutput'
}

export interface TaskIntegrationTasksOfCurrentUserOutput {
    data: TaskIntegrationTaskObject[]
    meta: PaginatedMetaType
    __typename: 'TaskIntegrationTasksOfCurrentUserOutput'
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
    getRoles: PaginatedRoles
    getMyRole: RoleType
    getUser: UserType
    getMyNotificationPreferences: GetNotificationPreferences
    projects: ProjectIntegrationProjectsOutput
    myProjects: ProjectIntegrationProjectsOfCurrentUserOutput
    projectUsers: ProjectIntegrationProjectUsersOutput
    projectUsersRoles: ProjectIntegrationUsersRoleObject[]
    projectTasksTags: ProjectIntegrationTasksTagObject[]
    projectTasksStatuses: ProjectIntegrationTasksStatusObject[]
    projectTasksRelations: ProjectIntegrationTasksRelationObject[]
    tasks: TaskIntegrationTasksOutput
    myTasks: TaskIntegrationTasksOfCurrentUserOutput
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
    changeMyNotificationPreferences: Scalars['Boolean']
    createProject: Scalars['String']
    updateProject: Scalars['String']
    createTask: Scalars['String']
    updateTask: Scalars['String']
    uploadFile: Scalars['String']
    __typename: 'Mutation'
}

export interface Subscription {
    getNotifications: NotificationWebResponse
    __typename: 'Subscription'
}

export interface PaginatedMetaTypeGenqlSelection {
    curPage?: boolean | number
    perPage?: boolean | number
    total?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationTasksRelationObjectGenqlSelection {
    id?: boolean | number
    code?: boolean | number
    nameMain?: boolean | number
    nameForeign?: boolean | number
    position?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationTasksStatusObjectGenqlSelection {
    id?: boolean | number
    code?: boolean | number
    name?: boolean | number
    position?: boolean | number
    isDefault?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationTasksTagObjectGenqlSelection {
    id?: boolean | number
    code?: boolean | number
    name?: boolean | number
    position?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationUsersRoleObjectGenqlSelection {
    id?: boolean | number
    code?: boolean | number
    name?: boolean | number
    position?: boolean | number
    description?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationUserObjectGenqlSelection {
    id?: boolean | number
    firstname?: boolean | number
    lastname?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationProjectUsersOutputGenqlSelection {
    data?: ProjectIntegrationUserObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationProjectObjectGenqlSelection {
    id?: boolean | number
    name?: boolean | number
    description?: boolean | number
    deadline?: boolean | number
    budget?: boolean | number
    version?: boolean | number
    createdAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationProjectsOutputGenqlSelection {
    data?: ProjectIntegrationProjectObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectIntegrationProjectsOfCurrentUserOutputGenqlSelection {
    data?: ProjectIntegrationProjectObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationUserObjectGenqlSelection {
    id?: boolean | number
    firstname?: boolean | number
    lastname?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationTaskObjectGenqlSelection {
    id?: boolean | number
    name?: boolean | number
    number?: boolean | number
    description?: boolean | number
    estimatedDateStart?: boolean | number
    estimatedDateEnd?: boolean | number
    estimatedDuration?: boolean | number
    version?: boolean | number
    createdAt?: boolean | number
    status?: boolean | number
    createdBy?: TaskIntegrationUserObjectGenqlSelection
    assignedTo?: TaskIntegrationUserObjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationTasksOutputGenqlSelection {
    data?: TaskIntegrationTaskObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationTasksOfCurrentUserOutputGenqlSelection {
    data?: TaskIntegrationTaskObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
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
    getRoles?: PaginatedRolesGenqlSelection & {
        __args: { input: GetRolesInput }
    }
    getMyRole?: RoleTypeGenqlSelection
    getUser?: UserTypeGenqlSelection & { __args: { input: GetUserInput } }
    getMyNotificationPreferences?: GetNotificationPreferencesGenqlSelection
    projects?: ProjectIntegrationProjectsOutputGenqlSelection
    myProjects?: ProjectIntegrationProjectsOfCurrentUserOutputGenqlSelection
    projectUsers?: ProjectIntegrationProjectUsersOutputGenqlSelection & {
        __args: { input: ProjectIntegrationProjectUsersInput }
    }
    projectUsersRoles?: ProjectIntegrationUsersRoleObjectGenqlSelection & {
        __args: { input: ProjectIntegrationProjectUsersRolesInput }
    }
    projectTasksTags?: ProjectIntegrationTasksTagObjectGenqlSelection & {
        __args: { input: ProjectIntegrationProjectTasksTagsInput }
    }
    projectTasksStatuses?: ProjectIntegrationTasksStatusObjectGenqlSelection & {
        __args: { input: ProjectIntegrationProjectTasksStatusesInput }
    }
    projectTasksRelations?: ProjectIntegrationTasksRelationObjectGenqlSelection & {
        __args: { input: ProjectIntegrationProjectTasksRelationsInput }
    }
    tasks?: TaskIntegrationTasksOutputGenqlSelection & {
        __args?: { input?: TaskIntegrationTasksInput | null }
    }
    myTasks?: TaskIntegrationTasksOfCurrentUserOutputGenqlSelection & {
        __args?: { input?: TaskIntegrationTasksOfCurrentUserInput | null }
    }
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

export interface GetUserInput {
    userId: Scalars['ID']
}

export interface ProjectIntegrationProjectUsersInput {
    projectId: Scalars['String']
    filterByName?: Scalars['String'] | null
    orderBy?: OrderByInput | null
}

export interface ProjectIntegrationProjectUsersRolesInput {
    projectId: Scalars['String']
}

export interface ProjectIntegrationProjectTasksTagsInput {
    projectId: Scalars['String']
}

export interface ProjectIntegrationProjectTasksStatusesInput {
    projectId: Scalars['String']
}

export interface ProjectIntegrationProjectTasksRelationsInput {
    projectId: Scalars['String']
}

export interface TaskIntegrationTasksInput {
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
}

export interface TaskIntegrationTasksOfCurrentUserInput {
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
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
    changeMyNotificationPreferences?: {
        __args: { input: ChangeMyNotificationPreferences }
    }
    createProject?: { __args: { input: ProjectIntegrationCreateProjectInput } }
    updateProject?: { __args: { input: ProjectIntegrationProjectUpdateInput } }
    createTask?: { __args: { input: TaskIntegrationTaskCreateInput } }
    updateTask?: { __args: { input: TaskIntegrationTaskUpdateInput } }
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

export interface ChangeMyNotificationPreferences {
    emailEnabled?: Scalars['Boolean'] | null
    email?: Scalars['String'] | null
    webEnabled?: Scalars['Boolean'] | null
    telegramEnabled?: Scalars['Boolean'] | null
    telegramAccount?: Scalars['Float'] | null
}

export interface ProjectIntegrationCreateProjectInput {
    name: Scalars['String']
    /** Budget of the project in hours */
    budget: Scalars['Float']
    /** Deadline of the project in timestampMs */
    deadline: Scalars['Float']
    description: Scalars['String']
    members?: ProjectIntegrationCreateProjectMemberInput[] | null
}

export interface ProjectIntegrationCreateProjectMemberInput {
    userId: Scalars['String']
    roleCode: Scalars['String']
}

export interface ProjectIntegrationProjectUpdateInput {
    id: Scalars['String']
    version: Scalars['Float']
    name?: Scalars['String'] | null
    description?: Scalars['String'] | null
    budget?: Scalars['Float'] | null
    deadline?: Scalars['Float'] | null
}

export interface TaskIntegrationTaskCreateInput {
    projectId: Scalars['String']
    name: Scalars['String']
    statusId: Scalars['String']
    description?: Scalars['String'] | null
    estimatedDateStart?: Scalars['Float'] | null
    estimatedDateEnd?: Scalars['Float'] | null
    estimatedDuration?: Scalars['Float'] | null
    assignedToId?: Scalars['String'] | null
    parentId?: Scalars['String'] | null
    tagsIds?: Scalars['String'][] | null
}

export interface TaskIntegrationTaskUpdateInput {
    id: Scalars['String']
    version: Scalars['Float']
    name?: Scalars['String'] | null
    description?: Scalars['String'] | null
    estimatedDateEnd?: Scalars['Float'] | null
    estimatedDateStart?: Scalars['Float'] | null
    estimatedDuration?: Scalars['Float'] | null
    parentId?: Scalars['String'] | null
    statusId?: Scalars['String'] | null
    assignedToId?: Scalars['String'] | null
    taskTagIds?: Scalars['String'][] | null
}

export interface UploadFileInput {
    file: Scalars['Upload']
}

export interface SubscriptionGenqlSelection {
    getNotifications?: NotificationWebResponseGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

const PaginatedMetaType_possibleTypes: string[] = ['PaginatedMetaType']
export const isPaginatedMetaType = (
    obj?: { __typename?: any } | null,
): obj is PaginatedMetaType => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isPaginatedMetaType"')
    return PaginatedMetaType_possibleTypes.includes(obj.__typename)
}

const ProjectIntegrationTasksRelationObject_possibleTypes: string[] = [
    'ProjectIntegrationTasksRelationObject',
]
export const isProjectIntegrationTasksRelationObject = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationTasksRelationObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationTasksRelationObject"',
        )
    return ProjectIntegrationTasksRelationObject_possibleTypes.includes(
        obj.__typename,
    )
}

const ProjectIntegrationTasksStatusObject_possibleTypes: string[] = [
    'ProjectIntegrationTasksStatusObject',
]
export const isProjectIntegrationTasksStatusObject = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationTasksStatusObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationTasksStatusObject"',
        )
    return ProjectIntegrationTasksStatusObject_possibleTypes.includes(
        obj.__typename,
    )
}

const ProjectIntegrationTasksTagObject_possibleTypes: string[] = [
    'ProjectIntegrationTasksTagObject',
]
export const isProjectIntegrationTasksTagObject = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationTasksTagObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationTasksTagObject"',
        )
    return ProjectIntegrationTasksTagObject_possibleTypes.includes(
        obj.__typename,
    )
}

const ProjectIntegrationUsersRoleObject_possibleTypes: string[] = [
    'ProjectIntegrationUsersRoleObject',
]
export const isProjectIntegrationUsersRoleObject = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationUsersRoleObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationUsersRoleObject"',
        )
    return ProjectIntegrationUsersRoleObject_possibleTypes.includes(
        obj.__typename,
    )
}

const ProjectIntegrationUserObject_possibleTypes: string[] = [
    'ProjectIntegrationUserObject',
]
export const isProjectIntegrationUserObject = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationUserObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationUserObject"',
        )
    return ProjectIntegrationUserObject_possibleTypes.includes(obj.__typename)
}

const ProjectIntegrationProjectUsersOutput_possibleTypes: string[] = [
    'ProjectIntegrationProjectUsersOutput',
]
export const isProjectIntegrationProjectUsersOutput = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationProjectUsersOutput => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationProjectUsersOutput"',
        )
    return ProjectIntegrationProjectUsersOutput_possibleTypes.includes(
        obj.__typename,
    )
}

const ProjectIntegrationProjectObject_possibleTypes: string[] = [
    'ProjectIntegrationProjectObject',
]
export const isProjectIntegrationProjectObject = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationProjectObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationProjectObject"',
        )
    return ProjectIntegrationProjectObject_possibleTypes.includes(
        obj.__typename,
    )
}

const ProjectIntegrationProjectsOutput_possibleTypes: string[] = [
    'ProjectIntegrationProjectsOutput',
]
export const isProjectIntegrationProjectsOutput = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationProjectsOutput => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationProjectsOutput"',
        )
    return ProjectIntegrationProjectsOutput_possibleTypes.includes(
        obj.__typename,
    )
}

const ProjectIntegrationProjectsOfCurrentUserOutput_possibleTypes: string[] = [
    'ProjectIntegrationProjectsOfCurrentUserOutput',
]
export const isProjectIntegrationProjectsOfCurrentUserOutput = (
    obj?: { __typename?: any } | null,
): obj is ProjectIntegrationProjectsOfCurrentUserOutput => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isProjectIntegrationProjectsOfCurrentUserOutput"',
        )
    return ProjectIntegrationProjectsOfCurrentUserOutput_possibleTypes.includes(
        obj.__typename,
    )
}

const TaskIntegrationUserObject_possibleTypes: string[] = [
    'TaskIntegrationUserObject',
]
export const isTaskIntegrationUserObject = (
    obj?: { __typename?: any } | null,
): obj is TaskIntegrationUserObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskIntegrationUserObject"',
        )
    return TaskIntegrationUserObject_possibleTypes.includes(obj.__typename)
}

const TaskIntegrationTaskObject_possibleTypes: string[] = [
    'TaskIntegrationTaskObject',
]
export const isTaskIntegrationTaskObject = (
    obj?: { __typename?: any } | null,
): obj is TaskIntegrationTaskObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskIntegrationTaskObject"',
        )
    return TaskIntegrationTaskObject_possibleTypes.includes(obj.__typename)
}

const TaskIntegrationTasksOutput_possibleTypes: string[] = [
    'TaskIntegrationTasksOutput',
]
export const isTaskIntegrationTasksOutput = (
    obj?: { __typename?: any } | null,
): obj is TaskIntegrationTasksOutput => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskIntegrationTasksOutput"',
        )
    return TaskIntegrationTasksOutput_possibleTypes.includes(obj.__typename)
}

const TaskIntegrationTasksOfCurrentUserOutput_possibleTypes: string[] = [
    'TaskIntegrationTasksOfCurrentUserOutput',
]
export const isTaskIntegrationTasksOfCurrentUserOutput = (
    obj?: { __typename?: any } | null,
): obj is TaskIntegrationTasksOfCurrentUserOutput => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskIntegrationTasksOfCurrentUserOutput"',
        )
    return TaskIntegrationTasksOfCurrentUserOutput_possibleTypes.includes(
        obj.__typename,
    )
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

const Subscription_possibleTypes: string[] = ['Subscription']
export const isSubscription = (
    obj?: { __typename?: any } | null,
): obj is Subscription => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isSubscription"')
    return Subscription_possibleTypes.includes(obj.__typename)
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
