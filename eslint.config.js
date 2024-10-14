const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
    {
        files: ['*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2023,
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.eslint.json'],
            },
            globals: {
                // for Node.js
                global: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            'no-console': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'arrow-parens': ['error', 'always'],
        },
    },
    {
        ignores: ['dist', 'coverage', 'node_modules'],
    },
];
