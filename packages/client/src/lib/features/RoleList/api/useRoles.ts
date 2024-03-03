import { useQuery } from '@apollo/client'
import { generateQueryOp } from '../../../sdk'
import gql from 'graphql-tag'

export const useRoles = () => {
    const { query, variables } = generateQueryOp({
        __name: 'getRoles',
        getRoles: {
            __args: {
                input: {
                    curPage: 1,
                    perPage: 10,
                },
            },
            data: {
                editable: true,
                id: true,
                name: true,
                superuser: true,
            },
        },
    })

    const { data, loading, error } = useQuery(gql(query), {
        variables,
    })
    return {
        data: data?.getRoles.data,
        loading,
        error,
    }
}
