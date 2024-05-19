export default {
    scalars: [1, 3, 7, 27, 31, 32, 36, 43, 86],
    types: {
        PaginatedMetaType: {
            curPage: [1],
            perPage: [1],
            total: [1],
            __typename: [3],
        },
        Float: {},
        CursorBasedMetaType: {
            cursor: [3],
            take: [1],
            __typename: [3],
        },
        String: {},
        ProjectIntegrationProjectObject: {
            id: [3],
            name: [3],
            description: [3],
            deadline: [1],
            budget: [1],
            version: [1],
            createdAt: [1],
            __typename: [3],
        },
        ProjectIntegrationTasksRelationObject: {
            id: [3],
            code: [3],
            nameMain: [3],
            nameForeign: [3],
            position: [1],
            description: [3],
            __typename: [3],
        },
        ProjectIntegrationTasksStatusObject: {
            id: [3],
            code: [3],
            name: [3],
            position: [1],
            isDefault: [7],
            description: [3],
            __typename: [3],
        },
        Boolean: {},
        ProjectIntegrationTasksTagObject: {
            id: [3],
            code: [3],
            name: [3],
            position: [1],
            description: [3],
            __typename: [3],
        },
        ProjectIntegrationUsersRoleObject: {
            id: [3],
            code: [3],
            name: [3],
            position: [1],
            description: [3],
            __typename: [3],
        },
        ProjectIntegrationUserObject: {
            id: [3],
            firstname: [3],
            lastname: [3],
            __typename: [3],
        },
        ProjectIntegrationProjectUsersOutput: {
            data: [10],
            meta: [0],
            __typename: [3],
        },
        ProjectIntegrationProjectsOutput: {
            data: [4],
            meta: [0],
            __typename: [3],
        },
        ProjectIntegrationProjectsOfCurrentUserOutput: {
            data: [4],
            meta: [0],
            __typename: [3],
        },
        TaskIntegrationTaskStatusObject: {
            id: [3],
            code: [3],
            name: [3],
            __typename: [3],
        },
        TaskIntegrationTaskTagObject: {
            id: [3],
            code: [3],
            name: [3],
            __typename: [3],
        },
        TaskIntegrationUserObject: {
            id: [3],
            firstname: [3],
            lastname: [3],
            __typename: [3],
        },
        TaskIntegrationTaskObject: {
            id: [3],
            name: [3],
            number: [1],
            description: [3],
            estimatedDateStart: [1],
            estimatedDateEnd: [1],
            estimatedDuration: [1],
            version: [1],
            createdAt: [1],
            status: [14],
            tags: [15],
            createdBy: [16],
            assignedTo: [16],
            effortsMs: [1],
            __typename: [3],
        },
        TaskIntegrationTasksOutput: {
            data: [17],
            meta: [0],
            __typename: [3],
        },
        TaskIntegrationMyTasksOutput: {
            data: [17],
            meta: [0],
            __typename: [3],
        },
        TaskCommentIntegrationUserObject: {
            id: [3],
            firstname: [3],
            lastname: [3],
            __typename: [3],
        },
        TaskCommentIntegrationCommentObject: {
            id: [3],
            text: [3],
            taskId: [3],
            user: [20],
            isCanUpdate: [7],
            isCanDelete: [7],
            createdAt: [1],
            updatedAt: [1],
            __typename: [3],
        },
        TaskCommentIntegrationCommentsOutput: {
            data: [21],
            meta: [0],
            __typename: [3],
        },
        TaskEffortIntegrationUserObject: {
            id: [3],
            firstname: [3],
            lastname: [3],
            __typename: [3],
        },
        TaskEffortIntegrationEffortObject: {
            id: [3],
            value: [1],
            description: [3],
            taskId: [3],
            user: [23],
            isCanUpdate: [7],
            isCanDelete: [7],
            createdAt: [1],
            updatedAt: [1],
            __typename: [3],
        },
        TaskEffortIntegrationEffortsOutput: {
            data: [24],
            meta: [0],
            __typename: [3],
        },
        MethodsType: {
            id: [27],
            name: [3],
            group: [3],
            editable: [7],
            description: [3],
            allowed: [7],
            __typename: [3],
        },
        ID: {},
        RoleType: {
            id: [27],
            name: [3],
            editable: [7],
            superuser: [7],
            methods: [26],
            __typename: [3],
        },
        PaginatedRoles: {
            data: [28],
            meta: [0],
            __typename: [3],
        },
        UserType: {
            id: [27],
            firstname: [3],
            lastname: [3],
            email: [3],
            status: [31],
            createdAt: [32],
            deletedAt: [32],
            __typename: [3],
        },
        AuthUserStatusEnum: {},
        DateTime: {},
        PaginatedUsers: {
            data: [30],
            meta: [0],
            __typename: [3],
        },
        AuthorizationResponse: {
            refreshToken: [3],
            accessToken: [3],
            userId: [27],
            expiresAt: [1],
            __typename: [3],
        },
        GetNotificationData: {
            id: [3],
            topic: [3],
            message: [3],
            link: [3],
            type: [36],
            sent: [7],
            sentAt: [32],
            seen: [7],
            __typename: [3],
        },
        NotificationTypeEnum: {},
        GetNotificationsResponse: {
            data: [35],
            meta: [2],
            __typename: [3],
        },
        GetNotificationPreferences: {
            emailEnabled: [7],
            email: [3],
            webEnabled: [7],
            telegramEnabled: [7],
            telegramAccount: [1],
            __typename: [3],
        },
        OnNewNotification: {
            userId: [3],
            topic: [3],
            message: [3],
            link: [3],
            __typename: [3],
        },
        Query: {
            getUsers: [
                33,
                {
                    input: [41, 'GetUsersInput!'],
                },
            ],
            getRoles: [
                29,
                {
                    input: [45, 'GetRolesInput!'],
                },
            ],
            getMyRole: [28],
            getUser: [
                30,
                {
                    input: [47, 'GetUserInput!'],
                },
            ],
            getMyNotificationPreferences: [38],
            getMyNotifications: [
                37,
                {
                    input: [48, 'GetNotificationsInput!'],
                },
            ],
            project: [
                4,
                {
                    input: [49, 'ProjectIntegrationProjectInput!'],
                },
            ],
            projects: [
                12,
                {
                    input: [50],
                },
            ],
            projectsOfCurrentUser: [13],
            projectUsers: [
                11,
                {
                    input: [52, 'ProjectIntegrationProjectUsersInput!'],
                },
            ],
            projectUsersRoles: [
                9,
                {
                    input: [53, 'ProjectIntegrationProjectUsersRolesInput!'],
                },
            ],
            projectTasksTags: [
                8,
                {
                    input: [54, 'ProjectIntegrationProjectTasksTagsInput!'],
                },
            ],
            projectTasksStatuses: [
                6,
                {
                    input: [55, 'ProjectIntegrationProjectTasksStatusesInput!'],
                },
            ],
            projectTasksRelations: [
                5,
                {
                    input: [
                        56,
                        'ProjectIntegrationProjectTasksRelationsInput!',
                    ],
                },
            ],
            task: [
                17,
                {
                    input: [57, 'TaskIntegrationTaskInput!'],
                },
            ],
            tasks: [
                18,
                {
                    input: [58],
                },
            ],
            myTasks: [
                19,
                {
                    input: [60],
                },
            ],
            getFile: [
                3,
                {
                    input: [61, 'GetFileInput!'],
                },
            ],
            taskComments: [
                22,
                {
                    input: [62, 'TaskCommentIntegrationCommentsInput!'],
                },
            ],
            taskEfforts: [
                25,
                {
                    input: [63],
                },
            ],
            __typename: [3],
        },
        GetUsersInput: {
            curPage: [1],
            perPage: [1],
            orderBy: [42],
            filter: [44],
            __typename: [3],
        },
        OrderByInput: {
            field: [3],
            order: [43],
            __typename: [3],
        },
        OrderEnum: {},
        GetUsersFilterInput: {
            email: [3],
            firstname: [3],
            lastname: [3],
            role: [3],
            status: [31],
            __typename: [3],
        },
        GetRolesInput: {
            curPage: [1],
            perPage: [1],
            filter: [46],
            __typename: [3],
        },
        GetRolesFilterInput: {
            name: [3],
            __typename: [3],
        },
        GetUserInput: {
            userId: [27],
            __typename: [3],
        },
        GetNotificationsInput: {
            userId: [3],
            cursor: [3],
            take: [1],
            type: [36],
            seen: [7],
            __typename: [3],
        },
        ProjectIntegrationProjectInput: {
            id: [3],
            __typename: [3],
        },
        ProjectIntegrationProjectsInput: {
            curPage: [1],
            perPage: [1],
            filterBy: [51],
            __typename: [3],
        },
        ProjectIntegrationProjectsFilterByInput: {
            name: [3],
            userId: [3],
            fulltext: [3],
            createdAtFrom: [1],
            createdAtTo: [1],
            __typename: [3],
        },
        ProjectIntegrationProjectUsersInput: {
            projectId: [3],
            filterByName: [3],
            orderBy: [42],
            __typename: [3],
        },
        ProjectIntegrationProjectUsersRolesInput: {
            projectId: [3],
            __typename: [3],
        },
        ProjectIntegrationProjectTasksTagsInput: {
            projectId: [3],
            __typename: [3],
        },
        ProjectIntegrationProjectTasksStatusesInput: {
            projectId: [3],
            __typename: [3],
        },
        ProjectIntegrationProjectTasksRelationsInput: {
            projectId: [3],
            __typename: [3],
        },
        TaskIntegrationTaskInput: {
            id: [3],
            __typename: [3],
        },
        TaskIntegrationTasksInput: {
            curPage: [1],
            perPage: [1],
            filterBy: [59],
            __typename: [3],
        },
        TaskIntegrationTasksFilterByInput: {
            name: [3],
            number: [1],
            statusId: [3],
            parentId: [3],
            projectId: [3],
            createdById: [3],
            assignedToId: [3],
            fulltext: [3],
            tagId: [3],
            createdAtFrom: [1],
            createdAtTo: [1],
            __typename: [3],
        },
        TaskIntegrationMyTasksInput: {
            projectId: [3],
            curPage: [1],
            perPage: [1],
            __typename: [3],
        },
        GetFileInput: {
            id: [3],
            __typename: [3],
        },
        TaskCommentIntegrationCommentsInput: {
            taskId: [3],
            curPage: [1],
            perPage: [1],
            __typename: [3],
        },
        TaskEffortIntegrationEffortsInput: {
            taskId: [3],
            curPage: [1],
            perPage: [1],
            __typename: [3],
        },
        Mutation: {
            updateRole: [
                7,
                {
                    input: [65, 'UpdateRoleInput!'],
                },
            ],
            changeUserRole: [
                7,
                {
                    input: [66, 'ChangeUserRoleInput!'],
                },
            ],
            createRole: [
                7,
                {
                    input: [67, 'CreateRoleInput!'],
                },
            ],
            deleteRole: [
                7,
                {
                    input: [68, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                7,
                {
                    input: [69, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                7,
                {
                    input: [71, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                34,
                {
                    input: [72, 'SignInInput!'],
                },
            ],
            refreshToken: [
                34,
                {
                    input: [73, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                30,
                {
                    input: [74, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                7,
                {
                    input: [75, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                34,
                {
                    input: [76, 'CompleteSignInInput!'],
                },
            ],
            changeMyNotificationPreferences: [
                7,
                {
                    input: [77, 'ChangeMyNotificationPreferences!'],
                },
            ],
            markAsSeen: [
                7,
                {
                    input: [78, 'MarkAsSeenInput!'],
                },
            ],
            markAllAsSeen: [
                7,
                {
                    input: [79, 'MarkAllAsSeenInput!'],
                },
            ],
            createProject: [
                3,
                {
                    input: [80, 'ProjectIntegrationCreateProjectInput!'],
                },
            ],
            updateProject: [
                3,
                {
                    input: [82, 'ProjectIntegrationProjectUpdateInput!'],
                },
            ],
            createTask: [
                3,
                {
                    input: [83, 'TaskIntegrationCreateTaskInput!'],
                },
            ],
            updateTask: [
                3,
                {
                    input: [84, 'TaskIntegrationUpdateTaskInput!'],
                },
            ],
            uploadFile: [
                3,
                {
                    input: [85, 'UploadFileInput!'],
                },
            ],
            createTaskComment: [
                3,
                {
                    input: [87, 'TaskCommentIntegrationCommentCreateInput!'],
                },
            ],
            updateTaskComment: [
                3,
                {
                    input: [88, 'TaskCommentIntegrationCommentUpdateInput!'],
                },
            ],
            deleteTaskComment: [
                3,
                {
                    input: [89, 'TaskCommentIntegrationCommentDeleteInput!'],
                },
            ],
            createTaskEffort: [
                3,
                {
                    input: [90, 'TaskEffortIntegrationEffortCreateInput!'],
                },
            ],
            updateTaskEffort: [
                3,
                {
                    input: [91, 'TaskEffortIntegrationEffortUpdateInput!'],
                },
            ],
            deleteTaskEffort: [
                3,
                {
                    input: [92, 'TaskEffortIntegrationEffortDeleteInput!'],
                },
            ],
            __typename: [3],
        },
        UpdateRoleInput: {
            roleId: [27],
            name: [3],
            superuser: [7],
            editable: [7],
            __typename: [3],
        },
        ChangeUserRoleInput: {
            userId: [27],
            roleName: [3],
            __typename: [3],
        },
        CreateRoleInput: {
            name: [3],
            __typename: [3],
        },
        DeleteRoleInput: {
            roleId: [27],
            __typename: [3],
        },
        ChangePermissionsInput: {
            roleId: [27],
            permissions: [70],
            __typename: [3],
        },
        PermissionInput: {
            methodId: [27],
            allow: [7],
            __typename: [3],
        },
        UpdateUserInput: {
            userId: [27],
            email: [3],
            firstname: [3],
            lastname: [3],
            password: [3],
            role: [3],
            status: [31],
            __typename: [3],
        },
        SignInInput: {
            email: [3],
            password: [3],
            __typename: [3],
        },
        RefreshTokenInput: {
            refreshToken: [3],
            __typename: [3],
        },
        CreateUserInput: {
            email: [3],
            firstname: [3],
            lastname: [3],
            roleName: [3],
            __typename: [3],
        },
        DeleteUserInput: {
            userId: [27],
            __typename: [3],
        },
        CompleteSignInInput: {
            userId: [27],
            code: [3],
            password: [3],
            __typename: [3],
        },
        ChangeMyNotificationPreferences: {
            emailEnabled: [7],
            email: [3],
            webEnabled: [7],
            telegramEnabled: [7],
            telegramAccount: [1],
            __typename: [3],
        },
        MarkAsSeenInput: {
            notificationId: [3],
            __typename: [3],
        },
        MarkAllAsSeenInput: {
            type: [36],
            __typename: [3],
        },
        ProjectIntegrationCreateProjectInput: {
            name: [3],
            budget: [1],
            deadline: [1],
            description: [3],
            members: [81],
            __typename: [3],
        },
        ProjectIntegrationCreateProjectMemberInput: {
            userId: [3],
            roleCode: [3],
            __typename: [3],
        },
        ProjectIntegrationProjectUpdateInput: {
            id: [3],
            version: [1],
            name: [3],
            description: [3],
            budget: [1],
            deadline: [1],
            __typename: [3],
        },
        TaskIntegrationCreateTaskInput: {
            projectId: [3],
            name: [3],
            statusId: [3],
            description: [3],
            estimatedDateStart: [1],
            estimatedDateEnd: [1],
            estimatedDuration: [1],
            assignedToId: [3],
            parentId: [3],
            tagIds: [3],
            __typename: [3],
        },
        TaskIntegrationUpdateTaskInput: {
            id: [3],
            version: [1],
            name: [3],
            description: [3],
            estimatedDateEnd: [1],
            estimatedDateStart: [1],
            estimatedDuration: [1],
            parentId: [3],
            statusId: [3],
            assignedToId: [3],
            tagIds: [3],
            __typename: [3],
        },
        UploadFileInput: {
            file: [86],
            __typename: [3],
        },
        Upload: {},
        TaskCommentIntegrationCommentCreateInput: {
            taskId: [3],
            text: [3],
            __typename: [3],
        },
        TaskCommentIntegrationCommentUpdateInput: {
            id: [3],
            text: [3],
            __typename: [3],
        },
        TaskCommentIntegrationCommentDeleteInput: {
            id: [3],
            __typename: [3],
        },
        TaskEffortIntegrationEffortCreateInput: {
            taskId: [3],
            value: [1],
            description: [3],
            __typename: [3],
        },
        TaskEffortIntegrationEffortUpdateInput: {
            id: [3],
            value: [1],
            description: [3],
            __typename: [3],
        },
        TaskEffortIntegrationEffortDeleteInput: {
            id: [3],
            __typename: [3],
        },
        Subscription: {
            onNewNotification: [39],
            __typename: [3],
        },
    },
}
