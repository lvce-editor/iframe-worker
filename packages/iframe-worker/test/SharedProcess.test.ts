import { beforeEach, expect, test } from '@jest/globals'
import { RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SharedProcess from '../src/parts/SharedProcess/SharedProcess.ts'

beforeEach(() => {
  RpcRegistry.remove(RpcId.RendererWorker)
})

test('invoke', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatSharedProcessInvoke': async () => {},
  })
  await SharedProcess.invoke('test.method', 'arg1', 'arg2')
  expect(mockRpc.invocations).toEqual([['WebView.compatSharedProcessInvoke', 'test.method', 'arg1', 'arg2']])
})

test('error case', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatSharedProcessInvoke': async () => {
      throw new Error('test error')
    },
  })
  await expect(SharedProcess.invoke('test.method')).rejects.toThrow('test error')
  expect(mockRpc.invocations).toEqual([['WebView.compatSharedProcessInvoke', 'test.method']])
})
