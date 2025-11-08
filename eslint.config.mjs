import panda from '@pandacss/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'

/** @type { import("eslint").Linter.Config[] } */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      'react-hooks': reactHooks,
      '@pandacss': panda,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',

      'import/order': [
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
      'import/no-anonymous-default-export': 'off',

      ...panda.configs.recommended.rules,
      '@pandacss/no-escape-hatch': 'error',
      '@pandacss/no-important': 'error',
      '@pandacss/prefer-longhand-properties': 'error',
      '@pandacss/prefer-unified-property-style': 'error',
      '@pandacss/no-physical-properties': 'error',
    },
  },
  eslintPluginPrettierRecommended,
  // Override default ignores of eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Additional custom ignores:
    'dist/**',
    'node_modules/**',
    'styled-system/**',
  ]),
])

export default eslintConfig
