export default {
    scalars: [1, 3, 6, 19, 23, 24, 28, 35, 71],
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
            data: [9],
            meta: [0],
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
        ProjectIntegrationProjectsOutput: {
            data: [11],
            meta: [0],
            __typename: [3],
        },
        ProjectIntegrationProjectsOfCurrentUserOutput: {
            data: [11],
            meta: [0],
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
            status: [3],
            createdBy: [14],
            assignedTo: [14],
            __typename: [3],
        },
        TaskIntegrationTasksOutput: {
            data: [15],
            meta: [0],
            __typename: [3],
        },
        TaskIntegrationTasksOfCurrentUserOutput: {
            data: [15],
            meta: [0],
            __typename: [3],
        },
        MethodsType: {
            id: [19],
            name: [3],
            group: [3],
            editable: [6],
            description: [3],
            allowed: [6],
            __typename: [3],
        },
        ID: {},
        RoleType: {
            id: [19],
            name: [3],
            editable: [6],
            superuser: [6],
            methods: [18],
            __typename: [3],
        },
        PaginatedRoles: {
            data: [20],
            meta: [0],
            __typename: [3],
        },
        UserType: {
            id: [19],
            firstname: [3],
            lastname: [3],
            email: [3],
            status: [23],
            createdAt: [24],
            deletedAt: [24],
            __typename: [3],
        },
        AuthUserStatusEnum: {},
        DateTime: {},
        PaginatedUsers: {
            data: [22],
            meta: [0],
            __typename: [3],
        },
        AuthorizationResponse: {
            refreshToken: [3],
            accessToken: [3],
            userId: [19],
            expiresAt: [1],
            __typename: [3],
        },
        GetNotificationData: {
            id: [3],
            topic: [3],
            message: [3],
            link: [3],
            type: [28],
            sent: [6],
            sentAt: [24],
            seen: [6],
            __typename: [3],
        },
        NotificationTypeEnum: {},
        GetNotificationsResponse: {
            data: [27],
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
        Query: {
            getUsers: [
                25,
                {
                    input: [33, 'GetUsersInput!'],
                },
            ],
            getRoles: [
                21,
                {
                    input: [37, 'GetRolesInput!'],
                },
            ],
            getMyRole: [20],
            getUser: [
                22,
                {
                    input: [39, 'GetUserInput!'],
                },
            ],
            getMyNotificationPreferences: [30],
            getMyNotifications: [
                29,
                {
                    input: [40, 'GetNotificationsInput!'],
                },
            ],
            projects: [12],
            myProjects: [13],
            projectUsers: [
                10,
                {
                    input: [41, 'ProjectIntegrationProjectUsersInput!'],
                },
            ],
            projectUsersRoles: [
                8,
                {
                    input: [42, 'ProjectIntegrationProjectUsersRolesInput!'],
                },
            ],
            projectTasksTags: [
                7,
                {
                    input: [43, 'ProjectIntegrationProjectTasksTagsInput!'],
                },
            ],
            projectTasksStatuses: [
                5,
                {
                    input: [44, 'ProjectIntegrationProjectTasksStatusesInput!'],
                },
            ],
            projectTasksRelations: [
                4,
                {
                    input: [
                        45,
                        'ProjectIntegrationProjectTasksRelationsInput!',
                    ],
                },
            ],
            tasks: [
                16,
                {
                    input: [46],
                },
            ],
            myTasks: [
                17,
                {
                    input: [47],
                },
            ],
            getFile: [
                3,
                {
                    input: [48, 'GetFileInput!'],
                },
            ],
            __typename: [3],
        },
        GetUsersInput: {
            curPage: [1],
            perPage: [1],
            orderBy: [34],
            filter: [36],
            __typename: [3],
        },
        OrderByInput: {
            field: [3],
            order: [35],
            __typename: [3],
        },
        OrderEnum: {},
        GetUsersFilterInput: {
            email: [3],
            firstname: [3],
            lastname: [3],
            role: [3],
            status: [23],
            __typename: [3],
        },
        GetRolesInput: {
            curPage: [1],
            perPage: [1],
            filter: [38],
            __typename: [3],
        },
        GetRolesFilterInput: {
            name: [3],
            __typename: [3],
        },
        GetUserInput: {
            userId: [19],
            __typename: [3],
        },
        GetNotificationsInput: {
            userId: [3],
            cursor: [3],
            take: [1],
            type: [28],
            seen: [6],
            __typename: [3],
        },
        ProjectIntegrationProjectUsersInput: {
            projectId: [3],
            filterByName: [3],
            orderBy: [34],
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
        TaskIntegrationTasksInput: {
            curPage: [1],
            perPage: [1],
            __typename: [3],
        },
        TaskIntegrationTasksOfCurrentUserInput: {
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
                6,
                {
                    input: [50, 'UpdateRoleInput!'],
                },
            ],
            changeUserRole: [
                6,
                {
                    input: [51, 'ChangeUserRoleInput!'],
                },
            ],
            createRole: [
                6,
                {
                    input: [52, 'CreateRoleInput!'],
                },
            ],
            deleteRole: [
                6,
                {
                    input: [53, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                6,
                {
                    input: [54, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                6,
                {
                    input: [56, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                26,
                {
                    input: [57, 'SignInInput!'],
                },
            ],
            refreshToken: [
                26,
                {
                    input: [58, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                22,
                {
                    input: [59, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                6,
                {
                    input: [60, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                26,
                {
                    input: [61, 'CompleteSignInInput!'],
                },
            ],
            changeMyNotificationPreferences: [
                6,
                {
                    input: [62, 'ChangeMyNotificationPreferences!'],
                },
            ],
            markAsSeen: [
                6,
                {
                    input: [63, 'MarkAsSeenInput!'],
                },
            ],
            markAllAsSeen: [
                6,
                {
                    input: [64, 'MarkAllAsSeenInput!'],
                },
            ],
            createProject: [
                3,
                {
                    input: [65, 'ProjectIntegrationCreateProjectInput!'],
                },
            ],
            updateProject: [
                3,
                {
                    input: [67, 'ProjectIntegrationProjectUpdateInput!'],
                },
            ],
            createTask: [
                3,
                {
                    input: [68, 'TaskIntegrationTaskCreateInput!'],
                },
            ],
            updateTask: [
                3,
                {
                    input: [69, 'TaskIntegrationTaskUpdateInput!'],
                },
            ],
            uploadFile: [
                3,
                {
                    input: [70, 'UploadFileInput!'],
                },
            ],
            __typename: [3],
        },
        UpdateRoleInput: {
            roleId: [19],
            name: [3],
            superuser: [6],
            editable: [6],
            __typename: [3],
        },
        ChangeUserRoleInput: {
            userId: [19],
            roleName: [3],
            __typename: [3],
        },
        CreateRoleInput: {
            name: [3],
            __typename: [3],
        },
        DeleteRoleInput: {
            roleId: [19],
            __typename: [3],
        },
        ChangePermissionsInput: {
            roleId: [19],
            permissions: [55],
            __typename: [3],
        },
        PermissionInput: {
            methodId: [19],
            allow: [6],
            __typename: [3],
        },
        UpdateUserInput: {
            userId: [19],
            email: [3],
            firstname: [3],
            lastname: [3],
            password: [3],
            role: [3],
            status: [23],
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
            userId: [19],
            __typename: [3],
        },
        CompleteSignInInput: {
            userId: [19],
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
            type: [28],
            __typename: [3],
        },
        ProjectIntegrationCreateProjectInput: {
            name: [3],
            budget: [1],
            deadline: [1],
            description: [3],
            members: [66],
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
            tagsIds: [3],
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
            taskTagIds: [3],
            __typename: [3],
        },
        UploadFileInput: {
            file: [71],
            __typename: [3],
        },
        Upload: {},
        Subscription: {
            onNewNotification: [31],
            __typename: [3],
        },
    },
}
