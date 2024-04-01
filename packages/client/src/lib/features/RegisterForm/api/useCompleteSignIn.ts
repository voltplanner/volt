import { useMutation } from '@apollo/client'
import { generateMutationOp } from '../../../sdk'
import gql from 'graphql-tag'

export interface CompleteSignInInput {
    userId: string,
    code: string,
    password: string
}

export const useCompleteSignIn = (payload: CompleteSignInInput) => {
    const { query, variables } = generateMutationOp({
        completeSignIn: {
            __args: {
                input: {
                    ...payload,
                },
            },
            accessToken: true,
            expiresAt: true,
            refreshToken: true,
            userId: true,
        },
    })

    const [completeSignIn, { data, loading, error }] = useMutation(gql(query), {
        variables,
    })

    return {
        completeSignIn,
        data,
        loading,
        error,
    }
}
