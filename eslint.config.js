import config from '@lvce-editor/eslint-config'

export default [
  ...config,
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
      // '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
]
