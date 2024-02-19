import { useMutation } from '@apollo/client'
import { generateMutationOp } from '../../sdk'
import gql from 'graphql-tag'

export interface RefreshTokenPayload {
    refreshToken: string
}

export const ApiRefreshToken = (payload: RefreshTokenPayload) => {
    const { query, variables } = generateMutationOp({
        refreshToken: {
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

    const [refreshToken, { data, loading, error }] = useMutation(gql(query), {
        variables,
    })

    return {
        refreshToken,
        data,
        loading,
        error,
    }
}
