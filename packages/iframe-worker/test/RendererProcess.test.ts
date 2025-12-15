import { beforeEach, expect, test } from '@jest/globals'
import { RpcId, RendererWorker } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

beforeEach(() => {
  RpcRegistry.remove(RpcId.RendererWorker)
})

test('invoke', async () => {
  const mockResult = { success: true }
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatRendererProcessInvoke': async () => mockResult,
  })
  const result = await RendererProcess.invoke('test.command', 'arg1', 'arg2')
  expect(result).toBe(mockResult)
  expect(mockRpc.invocations).toEqual([
    ['WebView.compatRendererProcessInvoke', 'test.command', 'arg1', 'arg2'],
  ])
})

test('invokeAndTransfer', async () => {
  const mockResult = { success: true }
  const transferable = new ArrayBuffer(8)
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatRendererProcessInvokeAndTransfer': async () => mockResult,
  })
  const result = await RendererProcess.invokeAndTransfer('test.command', transferable, 'arg1')
  expect(result).toBe(mockResult)
  expect(mockRpc.invocations).toEqual([
    ['WebView.compatRendererProcessInvokeAndTransfer', 'test.command', transferable, 'arg1'],
  ])
})

test('invoke - error case', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatRendererProcessInvoke': async () => {
      throw new Error('test error')
    },
  })
  await expect(RendererProcess.invoke('test.command')).rejects.toThrow('test error')
  expect(mockRpc.invocations).toEqual([['WebView.compatRendererProcessInvoke', 'test.command']])
})

test('invokeAndTransfer - error case', async () => {
  const transferable = new ArrayBuffer(8)
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.compatRendererProcessInvokeAndTransfer': async () => {
      throw new Error('test error')
    },
  })
  await expect(RendererProcess.invokeAndTransfer('test.command', transferable)).rejects.toThrow('test error')
  expect(mockRpc.invocations).toEqual([
    ['WebView.compatRendererProcessInvokeAndTransfer', 'test.command', transferable],
  ])
})
