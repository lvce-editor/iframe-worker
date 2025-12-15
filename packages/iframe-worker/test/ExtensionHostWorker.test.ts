import { beforeEach, expect, test } from '@jest/globals'
import { RpcId, RendererWorker } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'

beforeEach(() => {
  RpcRegistry.remove(RpcId.RendererWorker)
})

test('invoke', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatExtensionHostWorkerInvoke': async () => {},
  })
  await ExtensionHostWorker.invoke('test.method', 'arg1', 'arg2')
  expect(mockRpc.invocations).toEqual([['WebView.compatExtensionHostWorkerInvoke', 'test.method', 'arg1', 'arg2']])
})

test('invokeAndTransfer', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatExtensionHostWorkerInvokeAndTransfer': async () => {},
  })
  await ExtensionHostWorker.invokeAndTransfer('test.method', 'arg1', 'arg2')
  expect(mockRpc.invocations).toEqual([['WebView.compatExtensionHostWorkerInvokeAndTransfer', 'test.method', 'arg1', 'arg2']])
})

test('error case', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatExtensionHostWorkerInvoke': async () => {
      throw new Error('test error')
    },
  })
  await expect(ExtensionHostWorker.invoke('test.method')).rejects.toThrow('test error')
  expect(mockRpc.invocations).toEqual([['WebView.compatExtensionHostWorkerInvoke', 'test.method']])
})
