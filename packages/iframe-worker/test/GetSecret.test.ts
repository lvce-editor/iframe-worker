import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetSecret from '../src/parts/GetSecret/GetSecret.ts'

test('getSecret', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.getSecret': jest.fn().mockResolvedValue('test-secret-value'),
  })
  const key = 'test-key'
  const result = await GetSecret.getSecret(key)
  expect(result).toBe('test-secret-value')
  expect(mockRpc.invocations).toEqual([
    ['WebView.compatRendererWorkerInvoke', 'WebView.getSecret', key],
  ])
})

test('error case', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.getSecret': jest.fn().mockRejectedValue(new Error('test error')),
  })
  const key = 'test-key'
  await expect(GetSecret.getSecret(key)).rejects.toThrow('test error')
})
