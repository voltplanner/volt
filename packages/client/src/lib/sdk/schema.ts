// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Float: number
    String: string
    ID: string
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

export interface CursorBasedMetaType {
    cursor: Scalars['String']
    take: Scalars['Float']
    __typename: 'CursorBasedMetaType'
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

export interface GetNotificationData {
    id: Scalars['String']
    topic: Scalars['String']
    message: Scalars['String']
    link: Scalars['String']
    type: NotificationTypeEnum
    sent: Scalars['Boolean']
    sentAt: Scalars['DateTime']
    seen: Scalars['Boolean']
    __typename: 'GetNotificationData'
}

export type NotificationTypeEnum = 'EMAIL' | 'WEB' | 'TELEGRAM'

export interface GetNotificationsResponse {
    data: GetNotificationData[]
    meta: CursorBasedMetaType
    __typename: 'GetNotificationsResponse'
}

export interface GetNotificationPreferences {
    emailEnabled: Scalars['Boolean']
    email: Scalars['String'] | null
    webEnabled: Scalars['Boolean']
    telegramEnabled: Scalars['Boolean']
    telegramAccount: Scalars['Float'] | null
    __typename: 'GetNotificationPreferences'
}

export interface OnNewNotification {
    userId: Scalars['String']
    topic: Scalars['String']
    message: Scalars['String']
    link: Scalars['String'] | null
    __typename: 'OnNewNotification'
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

export interface TaskIntegrationTaskStatusObject {
    id: Scalars['String']
    code: Scalars['String']
    name: Scalars['String']
    __typename: 'TaskIntegrationTaskStatusObject'
}

export interface TaskIntegrationTaskTagObject {
    id: Scalars['String']
    code: Scalars['String']
    name: Scalars['String']
    __typename: 'TaskIntegrationTaskTagObject'
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
    status: TaskIntegrationTaskStatusObject
    tags: TaskIntegrationTaskTagObject[]
    createdBy: TaskIntegrationUserObject
    assignedTo: TaskIntegrationUserObject | null
    effortsMs: Scalars['Float']
    __typename: 'TaskIntegrationTaskObject'
}

export interface TaskIntegrationTasksOutput {
    data: TaskIntegrationTaskObject[]
    meta: PaginatedMetaType
    __typename: 'TaskIntegrationTasksOutput'
}

export interface TaskIntegrationMyTasksOutput {
    data: TaskIntegrationTaskObject[]
    meta: PaginatedMetaType
    __typename: 'TaskIntegrationMyTasksOutput'
}

export interface TaskCommentIntegrationUserObject {
    id: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    __typename: 'TaskCommentIntegrationUserObject'
}

export interface TaskCommentIntegrationCommentObject {
    id: Scalars['String']
    text: Scalars['String']
    taskId: Scalars['String']
    user: TaskCommentIntegrationUserObject
    isCanUpdate: Scalars['Boolean']
    isCanDelete: Scalars['Boolean']
    createdAt: Scalars['Float']
    updatedAt: Scalars['Float']
    __typename: 'TaskCommentIntegrationCommentObject'
}

export interface TaskCommentIntegrationCommentsOutput {
    data: TaskCommentIntegrationCommentObject[]
    meta: PaginatedMetaType
    __typename: 'TaskCommentIntegrationCommentsOutput'
}

export interface TaskEffortIntegrationUserObject {
    id: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    __typename: 'TaskEffortIntegrationUserObject'
}

export interface TaskEffortIntegrationEffortObject {
    id: Scalars['String']
    value: Scalars['Float']
    description: Scalars['String']
    taskId: Scalars['String']
    user: TaskEffortIntegrationUserObject
    isCanUpdate: Scalars['Boolean']
    isCanDelete: Scalars['Boolean']
    createdAt: Scalars['Float']
    updatedAt: Scalars['Float']
    __typename: 'TaskEffortIntegrationEffortObject'
}

export interface TaskEffortIntegrationEffortsOutput {
    data: TaskEffortIntegrationEffortObject[]
    meta: PaginatedMetaType
    __typename: 'TaskEffortIntegrationEffortsOutput'
}

export interface Query {
    task: TaskIntegrationTaskObject
    tasks: TaskIntegrationTasksOutput
    myTasks: TaskIntegrationMyTasksOutput
    taskComments: TaskCommentIntegrationCommentsOutput
    taskEfforts: TaskEffortIntegrationEffortsOutput
    project: ProjectIntegrationProjectObject
    projects: ProjectIntegrationProjectsOutput
    projectsOfCurrentUser: ProjectIntegrationProjectsOfCurrentUserOutput
    projectUsers: ProjectIntegrationProjectUsersOutput
    projectUsersRoles: ProjectIntegrationUsersRoleObject[]
    projectTasksTags: ProjectIntegrationTasksTagObject[]
    projectTasksStatuses: ProjectIntegrationTasksStatusObject[]
    projectTasksRelations: ProjectIntegrationTasksRelationObject[]
    getUsers: PaginatedUsers
    getRoles: PaginatedRoles
    getMyRole: RoleType
    getUser: UserType
    getMyNotificationPreferences: GetNotificationPreferences
    getMyNotifications: GetNotificationsResponse[]
    getFile: Scalars['String']
    __typename: 'Query'
}

export type OrderEnum = 'ASC' | 'DESC'

export interface Mutation {
    createTask: Scalars['String']
    updateTask: Scalars['String']
    createTaskComment: Scalars['String']
    updateTaskComment: Scalars['String']
    deleteTaskComment: Scalars['String']
    createTaskEffort: Scalars['String']
    updateTaskEffort: Scalars['String']
    deleteTaskEffort: Scalars['String']
    createProject: Scalars['String']
    updateProject: Scalars['String']
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
    markAsSeen: Scalars['Boolean']
    markAllAsSeen: Scalars['Boolean']
    uploadFile: Scalars['String']
    __typename: 'Mutation'
}

export interface Subscription {
    onNewNotification: OnNewNotification
    __typename: 'Subscription'
}

export interface PaginatedMetaTypeGenqlSelection {
    curPage?: boolean | number
    perPage?: boolean | number
    total?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CursorBasedMetaTypeGenqlSelection {
    cursor?: boolean | number
    take?: boolean | number
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

export interface GetNotificationDataGenqlSelection {
    id?: boolean | number
    topic?: boolean | number
    message?: boolean | number
    link?: boolean | number
    type?: boolean | number
    sent?: boolean | number
    sentAt?: boolean | number
    seen?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GetNotificationsResponseGenqlSelection {
    data?: GetNotificationDataGenqlSelection
    meta?: CursorBasedMetaTypeGenqlSelection
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

export interface OnNewNotificationGenqlSelection {
    userId?: boolean | number
    topic?: boolean | number
    message?: boolean | number
    link?: boolean | number
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

export interface TaskIntegrationTaskStatusObjectGenqlSelection {
    id?: boolean | number
    code?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationTaskTagObjectGenqlSelection {
    id?: boolean | number
    code?: boolean | number
    name?: boolean | number
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
    status?: TaskIntegrationTaskStatusObjectGenqlSelection
    tags?: TaskIntegrationTaskTagObjectGenqlSelection
    createdBy?: TaskIntegrationUserObjectGenqlSelection
    assignedTo?: TaskIntegrationUserObjectGenqlSelection
    effortsMs?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationTasksOutputGenqlSelection {
    data?: TaskIntegrationTaskObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationMyTasksOutputGenqlSelection {
    data?: TaskIntegrationTaskObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskCommentIntegrationUserObjectGenqlSelection {
    id?: boolean | number
    firstname?: boolean | number
    lastname?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskCommentIntegrationCommentObjectGenqlSelection {
    id?: boolean | number
    text?: boolean | number
    taskId?: boolean | number
    user?: TaskCommentIntegrationUserObjectGenqlSelection
    isCanUpdate?: boolean | number
    isCanDelete?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskCommentIntegrationCommentsOutputGenqlSelection {
    data?: TaskCommentIntegrationCommentObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskEffortIntegrationUserObjectGenqlSelection {
    id?: boolean | number
    firstname?: boolean | number
    lastname?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskEffortIntegrationEffortObjectGenqlSelection {
    id?: boolean | number
    value?: boolean | number
    description?: boolean | number
    taskId?: boolean | number
    user?: TaskEffortIntegrationUserObjectGenqlSelection
    isCanUpdate?: boolean | number
    isCanDelete?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskEffortIntegrationEffortsOutputGenqlSelection {
    data?: TaskEffortIntegrationEffortObjectGenqlSelection
    meta?: PaginatedMetaTypeGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection {
    task?: TaskIntegrationTaskObjectGenqlSelection & {
        __args: { input: TaskIntegrationTaskInput }
    }
    tasks?: TaskIntegrationTasksOutputGenqlSelection & {
        __args?: { input?: TaskIntegrationTasksInput | null }
    }
    myTasks?: TaskIntegrationMyTasksOutputGenqlSelection & {
        __args?: { input?: TaskIntegrationMyTasksInput | null }
    }
    taskComments?: TaskCommentIntegrationCommentsOutputGenqlSelection & {
        __args: { input: TaskCommentIntegrationCommentsInput }
    }
    taskEfforts?: TaskEffortIntegrationEffortsOutputGenqlSelection & {
        __args?: { input?: TaskEffortIntegrationEffortsInput | null }
    }
    project?: ProjectIntegrationProjectObjectGenqlSelection & {
        __args: { input: ProjectIntegrationProjectInput }
    }
    projects?: ProjectIntegrationProjectsOutputGenqlSelection & {
        __args?: { input?: ProjectIntegrationProjectsInput | null }
    }
    projectsOfCurrentUser?: ProjectIntegrationProjectsOfCurrentUserOutputGenqlSelection
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
    getUsers?: PaginatedUsersGenqlSelection & {
        __args: { input: GetUsersInput }
    }
    getRoles?: PaginatedRolesGenqlSelection & {
        __args: { input: GetRolesInput }
    }
    getMyRole?: RoleTypeGenqlSelection
    getUser?: UserTypeGenqlSelection & { __args: { input: GetUserInput } }
    getMyNotificationPreferences?: GetNotificationPreferencesGenqlSelection
    getMyNotifications?: GetNotificationsResponseGenqlSelection & {
        __args: { input: GetNotificationsInput }
    }
    getFile?: { __args: { input: GetFileInput } }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationTaskInput {
    id: Scalars['String']
}

export interface TaskIntegrationTasksInput {
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
    filterBy?: TaskIntegrationTasksFilterByInput | null
}

export interface TaskIntegrationTasksFilterByInput {
    name?: Scalars['String'][] | null
    number?: Scalars['Float'][] | null
    statusId?: Scalars['String'][] | null
    parentId?: Scalars['String'][] | null
    projectId?: Scalars['String'][] | null
    createdById?: Scalars['String'][] | null
    assignedToId?: Scalars['String'][] | null
    fulltext?: Scalars['String'][] | null
    tagId?: Scalars['String'][] | null
    createdAtFrom?: Scalars['Float'] | null
    createdAtTo?: Scalars['Float'] | null
}

export interface TaskIntegrationMyTasksInput {
    projectId?: Scalars['String'] | null
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
}

export interface TaskCommentIntegrationCommentsInput {
    taskId: Scalars['String']
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
}

export interface TaskEffortIntegrationEffortsInput {
    taskId?: Scalars['String'] | null
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
}

export interface ProjectIntegrationProjectInput {
    id: Scalars['String']
}

export interface ProjectIntegrationProjectsInput {
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
    filterBy?: ProjectIntegrationProjectsFilterByInput | null
}

export interface ProjectIntegrationProjectsFilterByInput {
    name?: Scalars['String'][] | null
    userId?: Scalars['String'][] | null
    fulltext?: Scalars['String'][] | null
    createdAtFrom?: Scalars['Float'] | null
    createdAtTo?: Scalars['Float'] | null
}

export interface ProjectIntegrationProjectUsersInput {
    projectId: Scalars['String']
    filterByName?: Scalars['String'] | null
    orderBy?: OrderByInput | null
}

export interface OrderByInput {
    field: Scalars['String']
    order: OrderEnum
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

export interface GetUsersInput {
    curPage?: Scalars['Float'] | null
    perPage?: Scalars['Float'] | null
    orderBy?: OrderByInput | null
    filter?: GetUsersFilterInput | null
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

export interface GetNotificationsInput {
    userId?: Scalars['String'] | null
    cursor?: Scalars['String'] | null
    take?: Scalars['Float'] | null
    type: NotificationTypeEnum
    seen?: Scalars['Boolean'] | null
}

export interface GetFileInput {
    id: Scalars['String']
}

export interface MutationGenqlSelection {
    createTask?: { __args: { input: TaskIntegrationCreateTaskInput } }
    updateTask?: { __args: { input: TaskIntegrationUpdateTaskInput } }
    createTaskComment?: {
        __args: { input: TaskCommentIntegrationCommentCreateInput }
    }
    updateTaskComment?: {
        __args: { input: TaskCommentIntegrationCommentUpdateInput }
    }
    deleteTaskComment?: {
        __args: { input: TaskCommentIntegrationCommentDeleteInput }
    }
    createTaskEffort?: {
        __args: { input: TaskEffortIntegrationEffortCreateInput }
    }
    updateTaskEffort?: {
        __args: { input: TaskEffortIntegrationEffortUpdateInput }
    }
    deleteTaskEffort?: {
        __args: { input: TaskEffortIntegrationEffortDeleteInput }
    }
    createProject?: { __args: { input: ProjectIntegrationCreateProjectInput } }
    updateProject?: { __args: { input: ProjectIntegrationProjectUpdateInput } }
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
    markAsSeen?: { __args: { input: MarkAsSeenInput } }
    markAllAsSeen?: { __args: { input: MarkAllAsSeenInput } }
    uploadFile?: { __args: { input: UploadFileInput } }
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TaskIntegrationCreateTaskInput {
    projectId: Scalars['String']
    name: Scalars['String']
    statusId: Scalars['String']
    description?: Scalars['String'] | null
    estimatedDateStart?: Scalars['Float'] | null
    estimatedDateEnd?: Scalars['Float'] | null
    estimatedDuration?: Scalars['Float'] | null
    assignedToId?: Scalars['String'] | null
    parentId?: Scalars['String'] | null
    tagIds?: Scalars['String'][] | null
}

export interface TaskIntegrationUpdateTaskInput {
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
    tagIds?: Scalars['String'][] | null
}

export interface TaskCommentIntegrationCommentCreateInput {
    taskId: Scalars['String']
    text: Scalars['String']
}

export interface TaskCommentIntegrationCommentUpdateInput {
    id: Scalars['String']
    text: Scalars['String']
}

export interface TaskCommentIntegrationCommentDeleteInput {
    id: Scalars['String']
}

export interface TaskEffortIntegrationEffortCreateInput {
    taskId: Scalars['String']
    value: Scalars['Float']
    description: Scalars['String']
}

export interface TaskEffortIntegrationEffortUpdateInput {
    id: Scalars['String']
    value: Scalars['Float']
    description: Scalars['String']
}

export interface TaskEffortIntegrationEffortDeleteInput {
    id: Scalars['String']
}

export interface ProjectIntegrationCreateProjectInput {
    name: Scalars['String']
    /** Budget of the project in hours */
    budget?: Scalars['Float'] | null
    /** Deadline of the project in timestampMs */
    deadline?: Scalars['Float'] | null
    description?: Scalars['String'] | null
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

export interface MarkAsSeenInput {
    notificationId: Scalars['String']
}

export interface MarkAllAsSeenInput {
    type: NotificationTypeEnum
}

export interface UploadFileInput {
    file: Scalars['Upload']
}

export interface SubscriptionGenqlSelection {
    onNewNotification?: OnNewNotificationGenqlSelection
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

const CursorBasedMetaType_possibleTypes: string[] = ['CursorBasedMetaType']
export const isCursorBasedMetaType = (
    obj?: { __typename?: any } | null,
): obj is CursorBasedMetaType => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isCursorBasedMetaType"')
    return CursorBasedMetaType_possibleTypes.includes(obj.__typename)
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

const GetNotificationData_possibleTypes: string[] = ['GetNotificationData']
export const isGetNotificationData = (
    obj?: { __typename?: any } | null,
): obj is GetNotificationData => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isGetNotificationData"')
    return GetNotificationData_possibleTypes.includes(obj.__typename)
}

const GetNotificationsResponse_possibleTypes: string[] = [
    'GetNotificationsResponse',
]
export const isGetNotificationsResponse = (
    obj?: { __typename?: any } | null,
): obj is GetNotificationsResponse => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isGetNotificationsResponse"')
    return GetNotificationsResponse_possibleTypes.includes(obj.__typename)
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

const OnNewNotification_possibleTypes: string[] = ['OnNewNotification']
export const isOnNewNotification = (
    obj?: { __typename?: any } | null,
): obj is OnNewNotification => {
    if (!obj?.__typename)
        throw new Error('__typename is missing in "isOnNewNotification"')
    return OnNewNotification_possibleTypes.includes(obj.__typename)
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

const TaskIntegrationTaskStatusObject_possibleTypes: string[] = [
    'TaskIntegrationTaskStatusObject',
]
export const isTaskIntegrationTaskStatusObject = (
    obj?: { __typename?: any } | null,
): obj is TaskIntegrationTaskStatusObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskIntegrationTaskStatusObject"',
        )
    return TaskIntegrationTaskStatusObject_possibleTypes.includes(
        obj.__typename,
    )
}

const TaskIntegrationTaskTagObject_possibleTypes: string[] = [
    'TaskIntegrationTaskTagObject',
]
export const isTaskIntegrationTaskTagObject = (
    obj?: { __typename?: any } | null,
): obj is TaskIntegrationTaskTagObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskIntegrationTaskTagObject"',
        )
    return TaskIntegrationTaskTagObject_possibleTypes.includes(obj.__typename)
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

const TaskIntegrationMyTasksOutput_possibleTypes: string[] = [
    'TaskIntegrationMyTasksOutput',
]
export const isTaskIntegrationMyTasksOutput = (
    obj?: { __typename?: any } | null,
): obj is TaskIntegrationMyTasksOutput => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskIntegrationMyTasksOutput"',
        )
    return TaskIntegrationMyTasksOutput_possibleTypes.includes(obj.__typename)
}

const TaskCommentIntegrationUserObject_possibleTypes: string[] = [
    'TaskCommentIntegrationUserObject',
]
export const isTaskCommentIntegrationUserObject = (
    obj?: { __typename?: any } | null,
): obj is TaskCommentIntegrationUserObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskCommentIntegrationUserObject"',
        )
    return TaskCommentIntegrationUserObject_possibleTypes.includes(
        obj.__typename,
    )
}

const TaskCommentIntegrationCommentObject_possibleTypes: string[] = [
    'TaskCommentIntegrationCommentObject',
]
export const isTaskCommentIntegrationCommentObject = (
    obj?: { __typename?: any } | null,
): obj is TaskCommentIntegrationCommentObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskCommentIntegrationCommentObject"',
        )
    return TaskCommentIntegrationCommentObject_possibleTypes.includes(
        obj.__typename,
    )
}

const TaskCommentIntegrationCommentsOutput_possibleTypes: string[] = [
    'TaskCommentIntegrationCommentsOutput',
]
export const isTaskCommentIntegrationCommentsOutput = (
    obj?: { __typename?: any } | null,
): obj is TaskCommentIntegrationCommentsOutput => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskCommentIntegrationCommentsOutput"',
        )
    return TaskCommentIntegrationCommentsOutput_possibleTypes.includes(
        obj.__typename,
    )
}

const TaskEffortIntegrationUserObject_possibleTypes: string[] = [
    'TaskEffortIntegrationUserObject',
]
export const isTaskEffortIntegrationUserObject = (
    obj?: { __typename?: any } | null,
): obj is TaskEffortIntegrationUserObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskEffortIntegrationUserObject"',
        )
    return TaskEffortIntegrationUserObject_possibleTypes.includes(
        obj.__typename,
    )
}

const TaskEffortIntegrationEffortObject_possibleTypes: string[] = [
    'TaskEffortIntegrationEffortObject',
]
export const isTaskEffortIntegrationEffortObject = (
    obj?: { __typename?: any } | null,
): obj is TaskEffortIntegrationEffortObject => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskEffortIntegrationEffortObject"',
        )
    return TaskEffortIntegrationEffortObject_possibleTypes.includes(
        obj.__typename,
    )
}

const TaskEffortIntegrationEffortsOutput_possibleTypes: string[] = [
    'TaskEffortIntegrationEffortsOutput',
]
export const isTaskEffortIntegrationEffortsOutput = (
    obj?: { __typename?: any } | null,
): obj is TaskEffortIntegrationEffortsOutput => {
    if (!obj?.__typename)
        throw new Error(
            '__typename is missing in "isTaskEffortIntegrationEffortsOutput"',
        )
    return TaskEffortIntegrationEffortsOutput_possibleTypes.includes(
        obj.__typename,
    )
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

export const enumNotificationTypeEnum = {
    EMAIL: 'EMAIL' as const,
    WEB: 'WEB' as const,
    TELEGRAM: 'TELEGRAM' as const,
}

export const enumOrderEnum = {
    ASC: 'ASC' as const,
    DESC: 'DESC' as const,
}
