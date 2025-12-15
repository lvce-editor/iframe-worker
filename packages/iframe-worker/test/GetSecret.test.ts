import { beforeEach, expect, jest, test } from '@jest/globals'
import { RpcId, RendererWorker } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as GetSecret from '../src/parts/GetSecret/GetSecret.ts'

beforeEach(() => {
  RpcRegistry.remove(RpcId.RendererWorker)
})

test('getSecret', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatRendererWorkerInvoke': jest.fn().mockResolvedValue('test-secret-value'),
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
    'WebView.compatRendererWorkerInvoke': jest.fn().mockRejectedValue(new Error('test error')),
  })
  const key = 'test-key'
  await expect(GetSecret.getSecret(key)).rejects.toThrow('test error')
  expect(mockRpc.invocations).toEqual([
    ['WebView.compatRendererWorkerInvoke', 'WebView.getSecret', key],
  ])
})
