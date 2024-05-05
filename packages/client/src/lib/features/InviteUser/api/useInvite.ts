import { useMutation } from '@apollo/client'
import { CreateUserInput, generateMutationOp, generateQueryOp } from '../../../sdk'
import gql from 'graphql-tag'

export const useInvite = (payload: CreateUserInput) => {
    const { query, variables } = generateMutationOp({
        createUser: {
            __args: {
                input: {
                    ...payload
                },
            },
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            status: true,
            createdAt: true,
            deletedAt: true,
        }
    })

    const [createUser, { data, loading, error }] = useMutation(gql(query), {
        variables,
    })
    return {
        createUser,
        data,
        loading,
        error,
    }
}
