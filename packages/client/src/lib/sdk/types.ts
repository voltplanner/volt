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
            id: [4],
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
            userId: [4],
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
            getMyRole: [
                6,
                {
                    input: [17, 'GetRolesInput!'],
                },
            ],
            getMyUser: [7],
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
            name: [4],
            __typename: [4],
        },
        Mutation: {
            updateRole: [
                5,
                {
                    input: [19, 'UpdateRoleInput!'],
                },
            ],
            deleteRole: [
                5,
                {
                    input: [20, 'DeleteRoleInput!'],
                },
            ],
            changePermissions: [
                5,
                {
                    input: [21, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                5,
                {
                    input: [23, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                11,
                {
                    input: [24, 'SignInInput!'],
                },
            ],
            refreshToken: [
                11,
                {
                    input: [25, 'RefreshTokenInput!'],
                },
            ],
            createUser: [
                7,
                {
                    input: [26, 'CreateUserInput!'],
                },
            ],
            deleteUser: [
                5,
                {
                    input: [27, 'DeleteUserInput!'],
                },
            ],
            completeSignIn: [
                11,
                {
                    input: [28, 'CompleteSignInInput!'],
                },
            ],
            __typename: [4],
        },
        UpdateRoleInput: {
            roleId: [4],
            name: [4],
            superuser: [5],
            editable: [5],
            __typename: [4],
        },
        DeleteRoleInput: {
            roleId: [4],
            __typename: [4],
        },
        ChangePermissionsInput: {
            roleId: [4],
            permissions: [22],
            __typename: [4],
        },
        PermissionInput: {
            methodId: [4],
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
            userId: [4],
            __typename: [4],
        },
        CompleteSignInInput: {
            userId: [4],
            code: [4],
            password: [4],
            __typename: [4],
        },
    },
}
