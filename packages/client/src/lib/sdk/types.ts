export default {
    scalars: [1, 2, 8, 10],
    types: {
        AuthorizationResponse: {
            refreshToken: [1],
            accessToken: [1],
            userId: [1],
            expiresAt: [2],
            __typename: [1],
        },
        String: {},
        Float: {},
        User: {
            id: [1],
            firstname: [1],
            lastname: [1],
            __typename: [1],
        },
        Query: {
            hi: [1],
            __typename: [1],
        },
        Mutation: {
            signIn: [
                0,
                {
                    input: [6, 'SignInInput!'],
                },
            ],
            createUser: [
                3,
                {
                    input: [7, 'CreateUserInput!'],
                },
            ],
            completeSignIn: [
                0,
                {
                    input: [9, 'CompleteSignInInput!'],
                },
            ],
            __typename: [1],
        },
        SignInInput: {
            email: [1],
            password: [1],
            __typename: [1],
        },
        CreateUserInput: {
            email: [1],
            firstname: [1],
            lastname: [1],
            role: [8],
            __typename: [1],
        },
        AuthUserRoleEnum: {},
        CompleteSignInInput: {
            userId: [1],
            code: [1],
            password: [1],
            __typename: [1],
        },
        Boolean: {},
    },
}
