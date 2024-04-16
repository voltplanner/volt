import { useMutation } from '@apollo/client'
import { ChangePermissionsInput, generateMutationOp } from '../../../sdk'
import gql from 'graphql-tag'

export const useChangePermissions = (payload: ChangePermissionsInput) => {
    const { query, variables } = generateMutationOp({
        changePermissions: {
            __args: {
                input: {
                    ...payload,
                },
            },
        },
    })

    const [changePermissions, { data, loading, error }] = useMutation(
        gql(query),
        {
            variables,
        },
    )

    return {
        changePermissions,
        data,
        loading,
        error,
    }
}
