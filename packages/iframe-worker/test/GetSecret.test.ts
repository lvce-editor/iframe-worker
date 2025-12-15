import { beforeEach, expect, test } from '@jest/globals'
import { RpcId, RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetSecret from '../src/parts/GetSecret/GetSecret.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

beforeEach(() => {
  RpcRegistry.remove(RpcId.RendererWorker)
})

test('getSecret', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatRendererWorkerInvoke': async () => 'test-secret-value',
  })
  const key = 'test-key'
  const result = await GetSecret.getSecret(key)
  expect(result).toBe('test-secret-value')
  expect(mockRpc.invocations).toEqual([['WebView.compatRendererWorkerInvoke', 'WebView.getSecret', key]])
})

test('error case', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatRendererWorkerInvoke': async () => {
      throw new Error('test error')
    },
  })
  const key = 'test-key'
  await expect(GetSecret.getSecret(key)).rejects.toThrow('test error')
  expect(mockRpc.invocations).toEqual([['WebView.compatRendererWorkerInvoke', 'WebView.getSecret', key]])
})
