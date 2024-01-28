import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: './schema.graphql',
    documents: ['src/**/*.tsx'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './packages/client/src/sdk/': {
            preset: 'client',
        },
    },
}

export default config
