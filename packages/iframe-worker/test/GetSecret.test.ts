import { beforeEach, expect, jest, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/rpc-registry'
import * as GetSecret from '../src/parts/GetSecret/GetSecret.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  mockRpc.invoke.mockReset()
  RpcRegistry.remove(RpcId.RendererWorker)
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)
})

test('getSecret', async () => {
  const mockSecret = 'test-secret-value'
  mockRpc.invoke.mockResolvedValue(mockSecret)
  const key = 'test-key'
  const result = await GetSecret.getSecret(key)
  expect(result).toBe(mockSecret)
  expect(mockRpc.invoke).toHaveBeenCalledWith('WebView.compatRendererWorkerInvoke', 'WebView.getSecret', key)
})

test('error case', async () => {
  mockRpc.invoke.mockRejectedValue(new Error('test error'))
  const key = 'test-key'
  await expect(GetSecret.getSecret(key)).rejects.toThrow('test error')
})
