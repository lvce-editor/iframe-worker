import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default [
  ...config.default,
  ...config.recommendedVirtualDom,
  ...actions.default,
  ...tsconfig.default,
  {
    ignores: [
      '**/server/**',
      '**/memory/**',
      '**/test-integration/**',
      '**/test-integration-util/**',
      'packages/iframe-worker/src/iframeWorkerMain.ts',
    ],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
      'jest/no-restricted-jest-methods': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      'unicorn/no-top-level-assignment-in-function': 'off',
      'unicorn/no-unsafe-string-replacement': 'off',
    },
  },
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      'e2e/prefer-import-meta-resolve': 'off',
      'unicorn/prefer-url-href': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'rpc/prefer-using-mock-rpc': 'off',
      'sonarjs/no-dead-store': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/prefer-https': 'off',
    },
  },
  {
    files: ['**/tsconfig.json'],
    rules: {
      'tsconfig/dont-skip-lib-check': 'off',
      'tsconfig/module-resolution': 'off',
    },
  },
]
