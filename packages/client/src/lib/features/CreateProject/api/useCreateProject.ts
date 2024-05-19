import { useMutation } from '@apollo/client'
import { ProjectIntegrationCreateProjectInput, generateMutationOp } from '../../../sdk'
import gql from 'graphql-tag'

export const useCreateProject = (payload: ProjectIntegrationCreateProjectInput) => {
    const { query, variables } = generateMutationOp({
        createProject: {
            __args: {
                input: {
                    ...payload,
                },
            },
        },
    })

    const [createProject, { data, loading, error }] = useMutation(
        gql(query),
        {
            variables,
        },
    )

    return {
        createProject,
        data,
        loading,
        error,
    }
}
