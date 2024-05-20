export default {
    scalars: [1, 3, 5, 6, 10, 11, 15, 37, 71],
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
            data: [23],
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
            data: [25],
            meta: [0],
            __typename: [3],
        },
        ProjectIntegrationProjectsOfCurrentUserOutput: {
            data: [25],
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
            createdBy: [28],
            assignedTo: [28],
            __typename: [3],
        },
        TaskIntegrationTasksOutput: {
            data: [29],
            meta: [0],
            __typename: [3],
        },
        TaskIntegrationTasksOfCurrentUserOutput: {
            data: [29],
            meta: [0],
            __typename: [3],
        },
        Query: {
            tasks: [
                30,
                {
                    input: [33],
                },
            ],
            myTasks: [
                31,
                {
                    input: [34],
                },
            ],
            projects: [26],
            myProjects: [27],
            projectUsers: [
                24,
                {
                    input: [35, 'ProjectIntegrationProjectUsersInput!'],
                },
            ],
            projectUsersRoles: [
                22,
                {
                    input: [38, 'ProjectIntegrationProjectUsersRolesInput!'],
                },
            ],
            projectTasksTags: [
                21,
                {
                    input: [39, 'ProjectIntegrationProjectTasksTagsInput!'],
                },
            ],
            projectTasksStatuses: [
                20,
                {
                    input: [40, 'ProjectIntegrationProjectTasksStatusesInput!'],
                },
            ],
            projectTasksRelations: [
                19,
                {
                    input: [
                        41,
                        'ProjectIntegrationProjectTasksRelationsInput!',
                    ],
                },
            ],
            getUsers: [
                12,
                {
                    input: [42, 'GetUsersInput!'],
                },
            ],
            getRoles: [
                8,
                {
                    input: [44, 'GetRolesInput!'],
                },
            ],
            getMyRole: [7],
            getUser: [
                9,
                {
                    input: [46, 'GetUserInput!'],
                },
            ],
            getMyNotificationPreferences: [17],
            getMyNotifications: [
                16,
                {
                    input: [47, 'GetNotificationsInput!'],
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
        ProjectIntegrationProjectUsersInput: {
            projectId: [3],
            filterByName: [3],
            orderBy: [36],
            __typename: [3],
        },
        OrderByInput: {
            field: [3],
            order: [37],
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
            orderBy: [36],
            filter: [43],
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
            filter: [45],
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
                    input: [50, 'TaskIntegrationTaskCreateInput!'],
                },
            ],
            updateTask: [
                3,
                {
                    input: [51, 'TaskIntegrationTaskUpdateInput!'],
                },
            ],
            createProject: [
                3,
                {
                    input: [52, 'ProjectIntegrationCreateProjectInput!'],
                },
            ],
            updateProject: [
                3,
                {
                    input: [54, 'ProjectIntegrationProjectUpdateInput!'],
                },
            ],
            updateRole: [
                6,
                {
                    input: [55, 'UpdateRoleInput!'],
                },
            ],
            changeUserRole: [
                6,
                {
                    input: [56, 'ChangeUserRoleInput!'],
                },
            ],
            createRole: [
                6,
                {
                    input: [57, 'CreateRoleInput!'],
                },
            ],
            deleteRole: [
                6,
                {
                    input: [58, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                6,
                {
                    input: [59, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                6,
                {
                    input: [61, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                13,
                {
                    input: [62, 'SignInInput!'],
                },
            ],
            refreshToken: [
                13,
                {
                    input: [63, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                9,
                {
                    input: [64, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                6,
                {
                    input: [65, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                13,
                {
                    input: [66, 'CompleteSignInInput!'],
                },
            ],
            changeMyNotificationPreferences: [
                6,
                {
                    input: [67, 'ChangeMyNotificationPreferences!'],
                },
            ],
            markAsSeen: [
                6,
                {
                    input: [68, 'MarkAsSeenInput!'],
                },
            ],
            markAllAsSeen: [
                6,
                {
                    input: [69, 'MarkAllAsSeenInput!'],
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
        ProjectIntegrationCreateProjectInput: {
            name: [3],
            budget: [1],
            deadline: [1],
            description: [3],
            members: [53],
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
            permissions: [60],
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
            file: [71],
            __typename: [3],
        },
        Upload: {},
        Subscription: {
            onNewNotification: [18],
            __typename: [3],
        },
    },
}
