export default {
    scalars: [1, 3, 5, 6, 10, 11, 16],
    types: {
        PaginatedMetaType: {
            curPage: [1],
            perPage: [1],
            total: [1],
            __typename: [3],
        },
        Float: {},
        AuthorizationResponse: {
            refreshToken: [3],
            accessToken: [3],
            userId: [3],
            expiresAt: [1],
            __typename: [3],
        },
        String: {},
        RoleType: {
            id: [5],
            name: [3],
            editable: [6],
            superuser: [6],
            __typename: [3],
        },
        ID: {},
        Boolean: {},
        MethodsType: {
            id: [5],
            name: [3],
            group: [3],
            description: [3],
            allowed: [6],
            __typename: [3],
        },
        AvailableMethodsType: {
            id: [5],
            name: [3],
            editable: [6],
            superuser: [6],
            methods: [7],
            __typename: [3],
        },
        UserType: {
            id: [3],
            firstname: [3],
            lastname: [3],
            email: [3],
            role: [4],
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
        Query: {
            getUsers: [
                12,
                {
                    input: [14, 'GetUsersInput!'],
                },
            ],
            getAvailableMethods: [
                8,
                {
                    input: [18, 'GetAvailableMethodsInput!'],
                },
            ],
            getRoles: [
                4,
                {
                    input: [19, 'GetRolesInput!'],
                },
            ],
            __typename: [3],
        },
        GetUsersInput: {
            curPage: [1],
            perPage: [1],
            orderBy: [15],
            filter: [17],
            __typename: [3],
        },
        OrderByInput: {
            field: [3],
            order: [16],
            __typename: [3],
        },
        OrderEnum: {},
        GetUsersFilterInput: {
            email: [3],
            firstname: [3],
            lastname: [3],
            role: [3],
            status: [10],
            __typename: [3],
        },
        GetAvailableMethodsInput: {
            name: [3],
            groups: [3],
            __typename: [3],
        },
        GetRolesInput: {
            name: [3],
            __typename: [3],
        },
        Mutation: {
            changePermissions: [
                6,
                {
                    input: [21, 'ChangePermissionsInput!'],
                },
            ],
            updateUser: [
                9,
                {
                    input: [23, 'UpdateUserInput!'],
                },
            ],
            signIn: [
                2,
                {
                    input: [24, 'SignInInput!'],
                },
            ],
            createUser: [
                9,
                {
                    input: [25, 'CreateUserInput!'],
                },
            ],
            completeSignIn: [
                2,
                {
                    input: [26, 'CompleteSignInInput!'],
                },
            ],
            __typename: [3],
        },
        ChangePermissionsInput: {
            roleId: [3],
            permissions: [22],
            __typename: [3],
        },
        PermissionInput: {
            methodId: [3],
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
        CreateUserInput: {
            email: [3],
            firstname: [3],
            lastname: [3],
            roleName: [3],
            __typename: [3],
        },
        CompleteSignInInput: {
            userId: [3],
            code: [3],
            password: [3],
            __typename: [3],
        },
    },
}
