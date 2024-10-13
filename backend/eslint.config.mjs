import globals from 'globals';
import pluginImport from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        files: ['**/*.{js,cjs,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            globals: globals.node
        },
        plugins: {
            import: pluginImport,
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/default': 'error',
            'import/namespace': 'error',

            '@typescript-eslint/no-unused-vars': 'warn',

            'no-unused-vars': 'warn',
            'no-undef': 'error',
            'semi': ['warn', 'always'],
            'quotes': ['warn', 'single'],
            'indent': ['warn', 4],
        }
    },
];
