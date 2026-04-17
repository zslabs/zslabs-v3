import js from '@eslint/js'
import panda from '@pandacss/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import-x'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

/** @type { import("eslint").Linter.Config[] } */
const eslintConfig = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      '@pandacss': panda,
      'import-x': importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',

      'import-x/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'import-x/no-anonymous-default-export': 'off',

      ...panda.configs.recommended.rules,
      '@pandacss/no-escape-hatch': 'error',
      '@pandacss/no-important': 'error',
      '@pandacss/prefer-longhand-properties': 'error',
      '@pandacss/prefer-unified-property-style': 'error',
      '@pandacss/no-physical-properties': 'error',
      '@pandacss/no-hardcoded-color': [
        'error',
        { noOpacity: true, whitelist: ['inherit'] },
      ],
    },
  },
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  globalIgnores([
    '.output/**',
    'dist/**',
    'node_modules/**',
    'styled-system/**',
  ]),
])

export default eslintConfig
