import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
  },
  {
    files: ['**/*.js', '*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'prefer-const': 'error',
      'no-undef': 'off',
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'unicorn/no-new-array': ['off'],
      'no-unused-vars': ['off'],
      'unused-imports/no-unused-vars': ['warn'],
      'antfu/if-newline': ['off'],
      'antfu/top-level-function': ['off'],
    },
  },
  {
    ignores: ['node_modules/*'],
  },
)
