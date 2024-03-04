export default {
    scalars: [1, 3, 4, 5, 9, 10, 17],
    types: {
        PaginatedMetaType: {
            curPage: [1],
            perPage: [1],
            total: [1],
            __typename: [4],
        },
        Float: {},
        MethodsType: {
            id: [3],
            name: [4],
            group: [4],
            editable: [5],
            description: [4],
            allowed: [5],
            __typename: [4],
        },
        ID: {},
        String: {},
        Boolean: {},
        RoleType: {
            id: [3],
            name: [4],
            editable: [5],
            superuser: [5],
            methods: [2],
            __typename: [4],
        },
        PaginatedRoles: {
            data: [6],
            meta: [0],
            __typename: [4],
        },
        UserType: {
            id: [3],
            firstname: [4],
            lastname: [4],
            email: [4],
            status: [9],
            createdAt: [10],
            deletedAt: [10],
            __typename: [4],
        },
        AuthUserStatusEnum: {},
        DateTime: {},
        PaginatedUsers: {
            data: [8],
            meta: [0],
            __typename: [4],
        },
        AuthorizationResponse: {
            refreshToken: [4],
            accessToken: [4],
            userId: [3],
            expiresAt: [1],
            __typename: [4],
        },
        GetNotificationPreferences: {
            emailEnabled: [5],
            email: [4],
            webEnabled: [5],
            telegramEnabled: [5],
            telegramAccount: [1],
            __typename: [4],
        },
        Query: {
            getUsers: [
                11,
                {
                    input: [15, 'GetUsersInput!'],
                },
            ],
            getRoles: [
                7,
                {
                    input: [19, 'GetRolesInput!'],
                },
            ],
            getMyRole: [6],
            getUser: [
                8,
                {
                    input: [21, 'GetUserInput!'],
                },
            ],
            getMyNotificationPreferences: [13],
            __typename: [4],
        },
        GetUsersInput: {
            curPage: [1],
            perPage: [1],
            orderBy: [16],
            filter: [18],
            __typename: [4],
        },
        OrderByInput: {
            field: [4],
            order: [17],
            __typename: [4],
        },
        OrderEnum: {},
        GetUsersFilterInput: {
            email: [4],
            firstname: [4],
            lastname: [4],
            role: [4],
            status: [9],
            __typename: [4],
        },
        GetRolesInput: {
            curPage: [1],
            perPage: [1],
            filter: [20],
            __typename: [4],
        },
        GetRolesFilterInput: {
            name: [4],
            __typename: [4],
        },
        GetUserInput: {
            userId: [3],
            __typename: [4],
        },
        Mutation: {
            updateRole: [
                5,
                {
                    input: [23, 'UpdateRoleInput!'],
                },
            ],
            changeUserRole: [
                5,
                {
                    input: [24, 'ChangeUserRoleInput!'],
                },
            ],
            createRole: [
                5,
                {
                    input: [25, 'CreateRoleInput!'],
                },
            ],
            deleteRole: [
                5,
                {
                    input: [26, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                5,
                {
                    input: [27, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                5,
                {
                    input: [29, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                12,
                {
                    input: [30, 'SignInInput!'],
                },
            ],
            refreshToken: [
                12,
                {
                    input: [31, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                8,
                {
                    input: [32, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                5,
                {
                    input: [33, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                12,
                {
                    input: [34, 'CompleteSignInInput!'],
                },
            ],
            changeMyNotificationPreferences: [
                5,
                {
                    input: [35, 'ChangeMyNotificationPreferences!'],
                },
            ],
            __typename: [4],
        },
        UpdateRoleInput: {
            roleId: [3],
            name: [4],
            superuser: [5],
            editable: [5],
            __typename: [4],
        },
        ChangeUserRoleInput: {
            userId: [3],
            roleName: [4],
            __typename: [4],
        },
        CreateRoleInput: {
            name: [4],
            __typename: [4],
        },
        DeleteRoleInput: {
            roleId: [3],
            __typename: [4],
        },
        ChangePermissionsInput: {
            roleId: [3],
            permissions: [28],
            __typename: [4],
        },
        PermissionInput: {
            methodId: [3],
            allow: [5],
            __typename: [4],
        },
        UpdateUserInput: {
            userId: [3],
            email: [4],
            firstname: [4],
            lastname: [4],
            password: [4],
            role: [4],
            status: [9],
            __typename: [4],
        },
        SignInInput: {
            email: [4],
            password: [4],
            __typename: [4],
        },
        RefreshTokenInput: {
            refreshToken: [4],
            __typename: [4],
        },
        CreateUserInput: {
            email: [4],
            firstname: [4],
            lastname: [4],
            roleName: [4],
            __typename: [4],
        },
        DeleteUserInput: {
            userId: [3],
            __typename: [4],
        },
        CompleteSignInInput: {
            userId: [3],
            code: [4],
            password: [4],
            __typename: [4],
        },
        ChangeMyNotificationPreferences: {
            emailEnabled: [5],
            email: [4],
            webEnabled: [5],
            telegramEnabled: [5],
            telegramAccount: [1],
            __typename: [4],
        },
    },
}
