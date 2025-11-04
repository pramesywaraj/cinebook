import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier, { rules } from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default [
    ...eslintPluginAstro.configs.recommended,
    eslintConfigPrettier,
    {
        files: ['**/*.astro'],
        languageOptions: {
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },
    {
        rules: {
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-unused-vars': 'off', // TypeScript handles this
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',

            // Code style (Prettier handles most)
            'prefer-const': 'warn',
            'no-var': 'error',

            // Import organization
            'import/order': [
                'warn',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
    {
        ignores: ['dist/**', '.astro/**', 'node_modules/**'],
    },
];
