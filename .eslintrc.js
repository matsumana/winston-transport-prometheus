/** @type {import('eslint').Linter.Config} */
module.exports = {
    env: {
        node: true,
        es2020: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json'],
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    rules: {
        'no-console': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'arrow-parens': ['error', 'always'],
    },
    overrides: [
        {
            files: ['*.js'],
            parser: 'espree', // eslint default parser
        },
    ],
};
