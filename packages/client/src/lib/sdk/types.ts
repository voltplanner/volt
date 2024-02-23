export default {
    scalars: [1, 3, 4, 5, 8, 9, 15],
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
        UserType: {
            id: [3],
            firstname: [4],
            lastname: [4],
            email: [4],
            status: [8],
            createdAt: [9],
            deletedAt: [9],
            __typename: [4],
        },
        AuthUserStatusEnum: {},
        DateTime: {},
        PaginatedUsers: {
            data: [7],
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
        Query: {
            getUsers: [
                10,
                {
                    input: [13, 'GetUsersInput!'],
                },
            ],
            getRoles: [
                6,
                {
                    input: [17, 'GetRolesInput!'],
                },
            ],
            getRole: [
                6,
                {
                    input: [17, 'GetRolesInput!'],
                },
            ],
            getUser: [
                7,
                {
                    input: [18, 'GetUserInput!'],
                },
            ],
            __typename: [4],
        },
        GetUsersInput: {
            curPage: [1],
            perPage: [1],
            orderBy: [14],
            filter: [16],
            __typename: [4],
        },
        OrderByInput: {
            field: [4],
            order: [15],
            __typename: [4],
        },
        OrderEnum: {},
        GetUsersFilterInput: {
            email: [4],
            firstname: [4],
            lastname: [4],
            role: [4],
            status: [8],
            __typename: [4],
        },
        GetRolesInput: {
            userId: [3],
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
                    input: [20, 'UpdateRoleInput!'],
                },
            ],
            changeUserRole: [
                5,
                {
                    input: [21, 'ChangeUserRoleInput!'],
                },
            ],
            createRole: [
                5,
                {
                    input: [22, 'CreateRoleInput!'],
                },
            ],
            deleteRole: [
                5,
                {
                    input: [23, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                5,
                {
                    input: [24, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                5,
                {
                    input: [26, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                11,
                {
                    input: [27, 'SignInInput!'],
                },
            ],
            refreshToken: [
                11,
                {
                    input: [28, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                7,
                {
                    input: [29, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                5,
                {
                    input: [30, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                11,
                {
                    input: [31, 'CompleteSignInInput!'],
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
            permissions: [25],
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
            status: [8],
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
    },
}
