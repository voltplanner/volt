import { useQuery } from '@apollo/client'
import { generateQueryOp } from '../../../sdk'
import gql from 'graphql-tag'

export const useRoles = (name: string) => {
    const { query, variables } = generateQueryOp({
        __name: 'getRoles',
        getRoles: {
            __args: {
                input: {
                    curPage: 1,
                    perPage: 10,
                    filter: {
                        name,
                    },
                },
            },
            data: {
                editable: true,
                id: true,
                name: true,
                superuser: true,
                methods: {
                    allowed: true,
                    description: true,
                    editable: true,
                    group: true,
                    id: true,
                    name: true,
                },
            },
            meta: {
                total: true,
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
