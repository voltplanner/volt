import { gql, useMutation } from "@apollo/client"
import { generateMutationOp } from "../../../sdk"

export interface SignInPayload {
    email: string
    password: string
}

export const ApiSignIn = (payload: SignInPayload) => {
    const { query, variables } = generateMutationOp({
        signIn: {
            __args: {
                input: {
                    ...payload
                }
            },
            accessToken: true,
            expiresAt: true,
            refreshToken: true,
            userId: true
        }
    })

    const [signIn, { data, loading, error }] = useMutation(gql(query), variables)

    return {
        signIn,
        data,
        loading,
        error
    }
}