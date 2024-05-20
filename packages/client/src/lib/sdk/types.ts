export default {
    scalars: [1, 3, 7, 21, 25, 26, 30, 37, 78],
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
        TaskIntegrationTasksOfCurrentUserOutput: {
            data: [17],
            meta: [0],
            __typename: [3],
        },
        MethodsType: {
            id: [21],
            name: [3],
            group: [3],
            editable: [7],
            description: [3],
            allowed: [7],
            __typename: [3],
        },
        ID: {},
        RoleType: {
            id: [21],
            name: [3],
            editable: [7],
            superuser: [7],
            methods: [20],
            __typename: [3],
        },
        PaginatedRoles: {
            data: [22],
            meta: [0],
            __typename: [3],
        },
        UserType: {
            id: [21],
            firstname: [3],
            lastname: [3],
            email: [3],
            status: [25],
            createdAt: [26],
            deletedAt: [26],
            __typename: [3],
        },
        AuthUserStatusEnum: {},
        DateTime: {},
        PaginatedUsers: {
            data: [24],
            meta: [0],
            __typename: [3],
        },
        AuthorizationResponse: {
            refreshToken: [3],
            accessToken: [3],
            userId: [21],
            expiresAt: [1],
            __typename: [3],
        },
        GetNotificationData: {
            id: [3],
            topic: [3],
            message: [3],
            link: [3],
            type: [30],
            sent: [7],
            sentAt: [26],
            seen: [7],
            __typename: [3],
        },
        NotificationTypeEnum: {},
        GetNotificationsResponse: {
            data: [29],
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
                27,
                {
                    input: [35, 'GetUsersInput!'],
                },
            ],
            getRoles: [
                23,
                {
                    input: [39, 'GetRolesInput!'],
                },
            ],
            getMyRole: [22],
            getUser: [
                24,
                {
                    input: [41, 'GetUserInput!'],
                },
            ],
            getMyNotificationPreferences: [32],
            getMyNotifications: [
                31,
                {
                    input: [42, 'GetNotificationsInput!'],
                },
            ],
            project: [
                4,
                {
                    input: [43, 'ProjectIntegrationProjectInput!'],
                },
            ],
            projects: [
                12,
                {
                    input: [44],
                },
            ],
            projectsOfCurrentUser: [13],
            projectUsers: [
                11,
                {
                    input: [46, 'ProjectIntegrationProjectUsersInput!'],
                },
            ],
            projectUsersRoles: [
                9,
                {
                    input: [47, 'ProjectIntegrationProjectUsersRolesInput!'],
                },
            ],
            projectTasksTags: [
                8,
                {
                    input: [48, 'ProjectIntegrationProjectTasksTagsInput!'],
                },
            ],
            projectTasksStatuses: [
                6,
                {
                    input: [49, 'ProjectIntegrationProjectTasksStatusesInput!'],
                },
            ],
            projectTasksRelations: [
                5,
                {
                    input: [
                        50,
                        'ProjectIntegrationProjectTasksRelationsInput!',
                    ],
                },
            ],
            task: [
                17,
                {
                    input: [51, 'TaskIntegrationTaskInput!'],
                },
            ],
            tasks: [
                18,
                {
                    input: [52],
                },
            ],
            tasksOfCurrentUser: [
                19,
                {
                    input: [54],
                },
            ],
            getFile: [
                3,
                {
                    input: [55, 'GetFileInput!'],
                },
            ],
            __typename: [3],
        },
        GetUsersInput: {
            curPage: [1],
            perPage: [1],
            orderBy: [36],
            filter: [38],
            __typename: [3],
        },
        OrderByInput: {
            field: [3],
            order: [37],
            __typename: [3],
        },
        OrderEnum: {},
        GetUsersFilterInput: {
            email: [3],
            firstname: [3],
            lastname: [3],
            role: [3],
            status: [25],
            __typename: [3],
        },
        GetRolesInput: {
            curPage: [1],
            perPage: [1],
            filter: [40],
            __typename: [3],
        },
        GetRolesFilterInput: {
            name: [3],
            __typename: [3],
        },
        GetUserInput: {
            userId: [21],
            __typename: [3],
        },
        GetNotificationsInput: {
            userId: [3],
            cursor: [3],
            take: [1],
            type: [30],
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
            filterBy: [45],
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
            orderBy: [36],
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
            filterBy: [53],
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
        TaskIntegrationTasksOfCurrentUserInput: {
            projectId: [3],
            curPage: [1],
            perPage: [1],
            __typename: [3],
        },
        GetFileInput: {
            id: [3],
            __typename: [3],
        },
        Mutation: {
            updateRole: [
                7,
                {
                    input: [57, 'UpdateRoleInput!'],
                },
            ],
            changeUserRole: [
                7,
                {
                    input: [58, 'ChangeUserRoleInput!'],
                },
            ],
            createRole: [
                7,
                {
                    input: [59, 'CreateRoleInput!'],
                },
            ],
            deleteRole: [
                7,
                {
                    input: [60, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                7,
                {
                    input: [61, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                7,
                {
                    input: [63, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                28,
                {
                    input: [64, 'SignInInput!'],
                },
            ],
            refreshToken: [
                28,
                {
                    input: [65, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                24,
                {
                    input: [66, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                7,
                {
                    input: [67, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                28,
                {
                    input: [68, 'CompleteSignInInput!'],
                },
            ],
            changeMyNotificationPreferences: [
                7,
                {
                    input: [69, 'ChangeMyNotificationPreferences!'],
                },
            ],
            markAsSeen: [
                7,
                {
                    input: [70, 'MarkAsSeenInput!'],
                },
            ],
            markAllAsSeen: [
                7,
                {
                    input: [71, 'MarkAllAsSeenInput!'],
                },
            ],
            createProject: [
                3,
                {
                    input: [72, 'ProjectIntegrationCreateProjectInput!'],
                },
            ],
            updateProject: [
                3,
                {
                    input: [74, 'ProjectIntegrationProjectUpdateInput!'],
                },
            ],
            taskCreate: [
                3,
                {
                    input: [75, 'TaskIntegrationTaskCreateInput!'],
                },
            ],
            taskUpdate: [
                3,
                {
                    input: [76, 'TaskIntegrationTaskUpdateInput!'],
                },
            ],
            uploadFile: [
                3,
                {
                    input: [77, 'UploadFileInput!'],
                },
            ],
            __typename: [3],
        },
        UpdateRoleInput: {
            roleId: [21],
            name: [3],
            superuser: [7],
            editable: [7],
            __typename: [3],
        },
        ChangeUserRoleInput: {
            userId: [21],
            roleName: [3],
            __typename: [3],
        },
        CreateRoleInput: {
            name: [3],
            __typename: [3],
        },
        DeleteRoleInput: {
            roleId: [21],
            __typename: [3],
        },
        ChangePermissionsInput: {
            roleId: [21],
            permissions: [62],
            __typename: [3],
        },
        PermissionInput: {
            methodId: [21],
            allow: [7],
            __typename: [3],
        },
        UpdateUserInput: {
            userId: [21],
            email: [3],
            firstname: [3],
            lastname: [3],
            password: [3],
            role: [3],
            status: [25],
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
            userId: [21],
            __typename: [3],
        },
        CompleteSignInInput: {
            userId: [21],
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
            type: [30],
            __typename: [3],
        },
        ProjectIntegrationCreateProjectInput: {
            name: [3],
            budget: [1],
            deadline: [1],
            description: [3],
            members: [73],
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
        TaskIntegrationTaskCreateInput: {
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
        TaskIntegrationTaskUpdateInput: {
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
            file: [78],
            __typename: [3],
        },
        Upload: {},
        Subscription: {
            onNewNotification: [33],
            __typename: [3],
        },
    },
}
