export default {
    scalars: [1, 3, 5, 18, 22, 23, 31, 64],
    types: {
        PaginatedMetaType: {
            curPage: [1],
            perPage: [1],
            total: [1],
            __typename: [3],
        },
        Float: {},
        ProjectIntegrationTasksRelationObject: {
            id: [3],
            code: [3],
            nameMain: [3],
            nameForeign: [3],
            position: [1],
            description: [3],
            __typename: [3],
        },
        String: {},
        ProjectIntegrationTasksStatusObject: {
            id: [3],
            code: [3],
            name: [3],
            position: [1],
            isDefault: [5],
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
            data: [8],
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
            data: [10],
            meta: [0],
            __typename: [3],
        },
        ProjectIntegrationProjectsOfCurrentUserOutput: {
            data: [10],
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
            createdBy: [13],
            assignedTo: [13],
            __typename: [3],
        },
        TaskIntegrationTasksOutput: {
            data: [14],
            meta: [0],
            __typename: [3],
        },
        TaskIntegrationTasksOfCurrentUserOutput: {
            data: [14],
            meta: [0],
            __typename: [3],
        },
        MethodsType: {
            id: [18],
            name: [3],
            group: [3],
            editable: [5],
            description: [3],
            allowed: [5],
            __typename: [3],
        },
        ID: {},
        RoleType: {
            id: [18],
            name: [3],
            editable: [5],
            superuser: [5],
            methods: [17],
            __typename: [3],
        },
        PaginatedRoles: {
            data: [19],
            meta: [0],
            __typename: [3],
        },
        UserType: {
            id: [18],
            firstname: [3],
            lastname: [3],
            email: [3],
            status: [22],
            createdAt: [23],
            deletedAt: [23],
            __typename: [3],
        },
        AuthUserStatusEnum: {},
        DateTime: {},
        PaginatedUsers: {
            data: [21],
            meta: [0],
            __typename: [3],
        },
        AuthorizationResponse: {
            refreshToken: [3],
            accessToken: [3],
            userId: [18],
            expiresAt: [1],
            __typename: [3],
        },
        GetNotificationPreferences: {
            emailEnabled: [5],
            email: [3],
            webEnabled: [5],
            telegramEnabled: [5],
            telegramAccount: [1],
            __typename: [3],
        },
        NotificationWebResponse: {
            userId: [3],
            topic: [3],
            message: [3],
            link: [3],
            __typename: [3],
        },
        Query: {
            getUsers: [
                24,
                {
                    input: [29, 'GetUsersInput!'],
                },
            ],
            getRoles: [
                20,
                {
                    input: [33, 'GetRolesInput!'],
                },
            ],
            getMyRole: [19],
            getUser: [
                21,
                {
                    input: [35, 'GetUserInput!'],
                },
            ],
            getMyNotificationPreferences: [26],
            projects: [11],
            myProjects: [12],
            projectUsers: [
                9,
                {
                    input: [36, 'ProjectIntegrationProjectUsersInput!'],
                },
            ],
            projectUsersRoles: [
                7,
                {
                    input: [37, 'ProjectIntegrationProjectUsersRolesInput!'],
                },
            ],
            projectTasksTags: [
                6,
                {
                    input: [38, 'ProjectIntegrationProjectTasksTagsInput!'],
                },
            ],
            projectTasksStatuses: [
                4,
                {
                    input: [39, 'ProjectIntegrationProjectTasksStatusesInput!'],
                },
            ],
            projectTasksRelations: [
                2,
                {
                    input: [
                        40,
                        'ProjectIntegrationProjectTasksRelationsInput!',
                    ],
                },
            ],
            tasks: [
                15,
                {
                    input: [41],
                },
            ],
            myTasks: [
                16,
                {
                    input: [42],
                },
            ],
            getFile: [
                3,
                {
                    input: [43, 'GetFileInput!'],
                },
            ],
            __typename: [3],
        },
        GetUsersInput: {
            curPage: [1],
            perPage: [1],
            orderBy: [30],
            filter: [32],
            __typename: [3],
        },
        OrderByInput: {
            field: [3],
            order: [31],
            __typename: [3],
        },
        OrderEnum: {},
        GetUsersFilterInput: {
            email: [3],
            firstname: [3],
            lastname: [3],
            role: [3],
            status: [22],
            __typename: [3],
        },
        GetRolesInput: {
            curPage: [1],
            perPage: [1],
            filter: [34],
            __typename: [3],
        },
        GetRolesFilterInput: {
            name: [3],
            __typename: [3],
        },
        GetUserInput: {
            userId: [18],
            __typename: [3],
        },
        ProjectIntegrationProjectUsersInput: {
            projectId: [3],
            filterByName: [3],
            orderBy: [30],
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
                5,
                {
                    input: [45, 'UpdateRoleInput!'],
                },
            ],
            changeUserRole: [
                5,
                {
                    input: [46, 'ChangeUserRoleInput!'],
                },
            ],
            createRole: [
                5,
                {
                    input: [47, 'CreateRoleInput!'],
                },
            ],
            deleteRole: [
                5,
                {
                    input: [48, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                5,
                {
                    input: [49, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                5,
                {
                    input: [51, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                25,
                {
                    input: [52, 'SignInInput!'],
                },
            ],
            refreshToken: [
                25,
                {
                    input: [53, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                21,
                {
                    input: [54, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                5,
                {
                    input: [55, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                25,
                {
                    input: [56, 'CompleteSignInInput!'],
                },
            ],
            changeMyNotificationPreferences: [
                5,
                {
                    input: [57, 'ChangeMyNotificationPreferences!'],
                },
            ],
            createProject: [
                3,
                {
                    input: [58, 'ProjectIntegrationCreateProjectInput!'],
                },
            ],
            updateProject: [
                3,
                {
                    input: [60, 'ProjectIntegrationProjectUpdateInput!'],
                },
            ],
            createTask: [
                3,
                {
                    input: [61, 'TaskIntegrationTaskCreateInput!'],
                },
            ],
            updateTask: [
                3,
                {
                    input: [62, 'TaskIntegrationTaskUpdateInput!'],
                },
            ],
            uploadFile: [
                3,
                {
                    input: [63, 'UploadFileInput!'],
                },
            ],
            __typename: [3],
        },
        UpdateRoleInput: {
            roleId: [18],
            name: [3],
            superuser: [5],
            editable: [5],
            __typename: [3],
        },
        ChangeUserRoleInput: {
            userId: [18],
            roleName: [3],
            __typename: [3],
        },
        CreateRoleInput: {
            name: [3],
            __typename: [3],
        },
        DeleteRoleInput: {
            roleId: [18],
            __typename: [3],
        },
        ChangePermissionsInput: {
            roleId: [18],
            permissions: [50],
            __typename: [3],
        },
        PermissionInput: {
            methodId: [18],
            allow: [5],
            __typename: [3],
        },
        UpdateUserInput: {
            userId: [18],
            email: [3],
            firstname: [3],
            lastname: [3],
            password: [3],
            role: [3],
            status: [22],
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
            userId: [18],
            __typename: [3],
        },
        CompleteSignInInput: {
            userId: [18],
            code: [3],
            password: [3],
            __typename: [3],
        },
        ChangeMyNotificationPreferences: {
            emailEnabled: [5],
            email: [3],
            webEnabled: [5],
            telegramEnabled: [5],
            telegramAccount: [1],
            __typename: [3],
        },
        ProjectIntegrationCreateProjectInput: {
            name: [3],
            budget: [1],
            deadline: [1],
            description: [3],
            members: [59],
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
            file: [64],
            __typename: [3],
        },
        Upload: {},
        Subscription: {
            getNotifications: [27],
            __typename: [3],
        },
    },
}
