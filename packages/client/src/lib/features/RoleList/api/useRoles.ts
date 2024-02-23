import { useQuery } from '@apollo/client'
import { generateQueryOp } from '../../../sdk'
import gql from 'graphql-tag'

export const useRoles = () => {
    const { query, variables } = generateQueryOp({
        __name: 'getRoles',
        getRoles: {
            __args: {
                input: {
                    userId: ''
                },
            },
            editable: true,
            id: true,
            name: true,
            superuser: true,
            
        },
    })

    const { data, loading, error } = useQuery(gql(query), {
        variables,
    })
    return {
        data: data?.getRoles,
        loading,
        error,
    }
}
