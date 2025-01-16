import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    ignores: [
      'src/iframeWorkerMain.ts',
      'packages/iframe-worker/src/iframeWorkerMain.ts',
      '**/server/**',
      '**/e2e/**',
      '**/memory/**',
      '**/test-integration/**',
      '**/test-integration-util/**',
    ],
  },
  {
    rules: {
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
