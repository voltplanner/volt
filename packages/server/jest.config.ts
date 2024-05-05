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
        '.*volt\/node_modules\/(?!(@apollo)|(execa)|(human-signals)\/.*)',
    ],
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/packages/server',
}
