import { beforeEach, expect, test } from '@jest/globals'
import { RpcId, RendererWorker } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

const GetWebViews = await import('../src/parts/GetWebViews/GetWebViews.ts')

beforeEach(() => {
  RpcRegistry.remove(RpcId.RendererWorker)
})

test('getWebViews', async () => {
  const mockWebViews = [
    { id: 1, type: 'preview' },
    { id: 2, type: 'custom' },
  ]
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.getWebViews': async () => mockWebViews,
  })
  const result = await GetWebViews.getWebViews()
  expect(result).toEqual(mockWebViews)
  expect(mockRpc.invocations).toEqual([['WebView.getWebViews']])
})

test('error case', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.getWebViews': async () => {
      throw new Error('test error')
    },
  })
  await expect(GetWebViews.getWebViews()).rejects.toThrow('test error')
  expect(mockRpc.invocations).toEqual([['WebView.getWebViews']])
})
