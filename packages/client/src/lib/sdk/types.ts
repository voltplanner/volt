export default {
    scalars: [1, 3, 5, 6, 10, 11, 15, 52, 92],
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
        MethodsType: {
            id: [5],
            name: [3],
            group: [3],
            editable: [6],
            description: [3],
            allowed: [6],
            __typename: [3],
        },
        ID: {},
        Boolean: {},
        RoleType: {
            id: [5],
            name: [3],
            editable: [6],
            superuser: [6],
            methods: [4],
            __typename: [3],
        },
        PaginatedRoles: {
            data: [7],
            meta: [0],
            __typename: [3],
        },
        UserType: {
            id: [5],
            firstname: [3],
            lastname: [3],
            email: [3],
            status: [10],
            createdAt: [11],
            deletedAt: [11],
            __typename: [3],
        },
        AuthUserStatusEnum: {},
        DateTime: {},
        PaginatedUsers: {
            data: [9],
            meta: [0],
            __typename: [3],
        },
        AuthorizationResponse: {
            refreshToken: [3],
            accessToken: [3],
            userId: [5],
            expiresAt: [1],
            __typename: [3],
        },
        GetNotificationData: {
            id: [3],
            topic: [3],
            message: [3],
            link: [3],
            type: [15],
            sent: [6],
            sentAt: [11],
            seen: [6],
            __typename: [3],
        },
        NotificationTypeEnum: {},
        GetNotificationsResponse: {
            data: [14],
            meta: [2],
            __typename: [3],
        },
        GetNotificationPreferences: {
            emailEnabled: [6],
            email: [3],
            webEnabled: [6],
            telegramEnabled: [6],
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
            isDefault: [6],
            description: [3],
            __typename: [3],
        },
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
            data: [24],
            meta: [0],
            __typename: [3],
        },
        ProjectIntegrationProjectsOutput: {
            data: [19],
            meta: [0],
            __typename: [3],
        },
        ProjectIntegrationProjectsOfCurrentUserOutput: {
            data: [19],
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
            status: [28],
            tags: [29],
            createdBy: [30],
            assignedTo: [30],
            effortsMs: [1],
            __typename: [3],
        },
        TaskIntegrationTasksOutput: {
            data: [31],
            meta: [0],
            __typename: [3],
        },
        TaskIntegrationMyTasksOutput: {
            data: [31],
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
            user: [34],
            isCanUpdate: [6],
            isCanDelete: [6],
            createdAt: [1],
            updatedAt: [1],
            __typename: [3],
        },
        TaskCommentIntegrationCommentsOutput: {
            data: [35],
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
            user: [37],
            isCanUpdate: [6],
            isCanDelete: [6],
            createdAt: [1],
            updatedAt: [1],
            __typename: [3],
        },
        TaskEffortIntegrationEffortsOutput: {
            data: [38],
            meta: [0],
            __typename: [3],
        },
        Query: {
            task: [
                31,
                {
                    input: [41, 'TaskIntegrationTaskInput!'],
                },
            ],
            tasks: [
                32,
                {
                    input: [42],
                },
            ],
            myTasks: [
                33,
                {
                    input: [44],
                },
            ],
            taskComments: [
                36,
                {
                    input: [45, 'TaskCommentIntegrationCommentsInput!'],
                },
            ],
            taskEfforts: [
                39,
                {
                    input: [46],
                },
            ],
            project: [
                19,
                {
                    input: [47, 'ProjectIntegrationProjectInput!'],
                },
            ],
            projects: [
                26,
                {
                    input: [48],
                },
            ],
            projectsOfCurrentUser: [27],
            projectUsers: [
                25,
                {
                    input: [50, 'ProjectIntegrationProjectUsersInput!'],
                },
            ],
            projectUsersRoles: [
                23,
                {
                    input: [53, 'ProjectIntegrationProjectUsersRolesInput!'],
                },
            ],
            projectTasksTags: [
                22,
                {
                    input: [54, 'ProjectIntegrationProjectTasksTagsInput!'],
                },
            ],
            projectTasksStatuses: [
                21,
                {
                    input: [55, 'ProjectIntegrationProjectTasksStatusesInput!'],
                },
            ],
            projectTasksRelations: [
                20,
                {
                    input: [
                        56,
                        'ProjectIntegrationProjectTasksRelationsInput!',
                    ],
                },
            ],
            getUsers: [
                12,
                {
                    input: [57, 'GetUsersInput!'],
                },
            ],
            getRoles: [
                8,
                {
                    input: [59, 'GetRolesInput!'],
                },
            ],
            getMyRole: [7],
            getUser: [
                9,
                {
                    input: [61, 'GetUserInput!'],
                },
            ],
            getMyNotificationPreferences: [17],
            getMyNotifications: [
                16,
                {
                    input: [62, 'GetNotificationsInput!'],
                },
            ],
            getFile: [
                3,
                {
                    input: [63, 'GetFileInput!'],
                },
            ],
            __typename: [3],
        },
        TaskIntegrationTaskInput: {
            id: [3],
            __typename: [3],
        },
        TaskIntegrationTasksInput: {
            curPage: [1],
            perPage: [1],
            filterBy: [43],
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
        ProjectIntegrationProjectInput: {
            id: [3],
            __typename: [3],
        },
        ProjectIntegrationProjectsInput: {
            curPage: [1],
            perPage: [1],
            filterBy: [49],
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
            orderBy: [51],
            __typename: [3],
        },
        OrderByInput: {
            field: [3],
            order: [52],
            __typename: [3],
        },
        OrderEnum: {},
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
        GetUsersInput: {
            curPage: [1],
            perPage: [1],
            orderBy: [51],
            filter: [58],
            __typename: [3],
        },
        GetUsersFilterInput: {
            email: [3],
            firstname: [3],
            lastname: [3],
            role: [3],
            status: [10],
            __typename: [3],
        },
        GetRolesInput: {
            curPage: [1],
            perPage: [1],
            filter: [60],
            __typename: [3],
        },
        GetRolesFilterInput: {
            name: [3],
            __typename: [3],
        },
        GetUserInput: {
            userId: [5],
            __typename: [3],
        },
        GetNotificationsInput: {
            userId: [3],
            cursor: [3],
            take: [1],
            type: [15],
            seen: [6],
            __typename: [3],
        },
        GetFileInput: {
            id: [3],
            __typename: [3],
        },
        Mutation: {
            createTask: [
                3,
                {
                    input: [65, 'TaskIntegrationCreateTaskInput!'],
                },
            ],
            updateTask: [
                3,
                {
                    input: [66, 'TaskIntegrationUpdateTaskInput!'],
                },
            ],
            createTaskComment: [
                3,
                {
                    input: [67, 'TaskCommentIntegrationCommentCreateInput!'],
                },
            ],
            updateTaskComment: [
                3,
                {
                    input: [68, 'TaskCommentIntegrationCommentUpdateInput!'],
                },
            ],
            deleteTaskComment: [
                3,
                {
                    input: [69, 'TaskCommentIntegrationCommentDeleteInput!'],
                },
            ],
            createTaskEffort: [
                3,
                {
                    input: [70, 'TaskEffortIntegrationEffortCreateInput!'],
                },
            ],
            updateTaskEffort: [
                3,
                {
                    input: [71, 'TaskEffortIntegrationEffortUpdateInput!'],
                },
            ],
            deleteTaskEffort: [
                3,
                {
                    input: [72, 'TaskEffortIntegrationEffortDeleteInput!'],
                },
            ],
            createProject: [
                3,
                {
                    input: [73, 'ProjectIntegrationCreateProjectInput!'],
                },
            ],
            updateProject: [
                3,
                {
                    input: [75, 'ProjectIntegrationProjectUpdateInput!'],
                },
            ],
            updateRole: [
                6,
                {
                    input: [76, 'UpdateRoleInput!'],
                },
            ],
            changeUserRole: [
                6,
                {
                    input: [77, 'ChangeUserRoleInput!'],
                },
            ],
            createRole: [
                6,
                {
                    input: [78, 'CreateRoleInput!'],
                },
            ],
            deleteRole: [
                6,
                {
                    input: [79, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                6,
                {
                    input: [80, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                6,
                {
                    input: [82, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                13,
                {
                    input: [83, 'SignInInput!'],
                },
            ],
            refreshToken: [
                13,
                {
                    input: [84, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                9,
                {
                    input: [85, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                6,
                {
                    input: [86, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                13,
                {
                    input: [87, 'CompleteSignInInput!'],
                },
            ],
            changeMyNotificationPreferences: [
                6,
                {
                    input: [88, 'ChangeMyNotificationPreferences!'],
                },
            ],
            markAsSeen: [
                6,
                {
                    input: [89, 'MarkAsSeenInput!'],
                },
            ],
            markAllAsSeen: [
                6,
                {
                    input: [90, 'MarkAllAsSeenInput!'],
                },
            ],
            uploadFile: [
                3,
                {
                    input: [91, 'UploadFileInput!'],
                },
            ],
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
        ProjectIntegrationCreateProjectInput: {
            name: [3],
            budget: [1],
            deadline: [1],
            description: [3],
            members: [74],
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
        UpdateRoleInput: {
            roleId: [5],
            name: [3],
            superuser: [6],
            editable: [6],
            __typename: [3],
        },
        ChangeUserRoleInput: {
            userId: [5],
            roleName: [3],
            __typename: [3],
        },
        CreateRoleInput: {
            name: [3],
            __typename: [3],
        },
        DeleteRoleInput: {
            roleId: [5],
            __typename: [3],
        },
        ChangePermissionsInput: {
            roleId: [5],
            permissions: [81],
            __typename: [3],
        },
        PermissionInput: {
            methodId: [5],
            allow: [6],
            __typename: [3],
        },
        UpdateUserInput: {
            userId: [5],
            email: [3],
            firstname: [3],
            lastname: [3],
            password: [3],
            role: [3],
            status: [10],
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
            userId: [5],
            __typename: [3],
        },
        CompleteSignInInput: {
            userId: [5],
            code: [3],
            password: [3],
            __typename: [3],
        },
        ChangeMyNotificationPreferences: {
            emailEnabled: [6],
            email: [3],
            webEnabled: [6],
            telegramEnabled: [6],
            telegramAccount: [1],
            __typename: [3],
        },
        MarkAsSeenInput: {
            notificationId: [3],
            __typename: [3],
        },
        MarkAllAsSeenInput: {
            type: [15],
            __typename: [3],
        },
        UploadFileInput: {
            file: [92],
            __typename: [3],
        },
        Upload: {},
        Subscription: {
            onNewNotification: [18],
            __typename: [3],
        },
    },
}
