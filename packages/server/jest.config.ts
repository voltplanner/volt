/* eslint-disable */
export default {
    displayName: 'server',
    preset: '../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' },
        ],
    },
    transformIgnorePatterns: [
        '.*volt/node_modules/packages/server/(?!(@apollo)|(execa)|(human-signals)|(graphql-request)/.*)',
        '.*volt/node_modules/(?!(@apollo)/.*)',
    ],
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/packages/server',
}
