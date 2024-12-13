import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import panda from '@pandacss/eslint-plugin'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    ignores: [
      'dist',
      'build',
      'node_modules',
      '.next',
      'icons/build',
      'styled-system',
      '.contentlayer',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@pandacss': panda,
    },
    rules: {
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
]
