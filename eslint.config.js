import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...actions.default,
  {
    ignores: ['src/iframeWorkerMain.ts'],
  },
  {
    ignores: [
      '**/server/**',
      '**/e2e/**',
      '**/memory/**',
      '**/test-integration/**',
      '**/test-integration-util/**',
      'packages/iframe-worker/src/iframeWorkerMain.ts',
    ],
  },
  {
    files: ['**/*.ts'],
    rules: {
      'jest/no-restricted-jest-methods': 'off',
    },
  },
]
