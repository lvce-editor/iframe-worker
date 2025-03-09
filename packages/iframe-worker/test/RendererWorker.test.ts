import { beforeEach, expect, jest, test } from '@jest/globals'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

const mockRpc = {
  invoke: jest.fn(),
  invokeAndTransfer: jest.fn(),
} as any

beforeEach(() => {
  mockRpc.invoke.mockReset()
  mockRpc.invokeAndTransfer.mockReset()
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)
})

test('invoke', async () => {
  await RendererWorker.invoke('test.method', 'arg1', 'arg2')
  expect(mockRpc.invoke).toHaveBeenCalledWith('WebView.compatRendererWorkerInvoke', 'test.method', 'arg1', 'arg2')
})

test('invokeAndTransfer', async () => {
  await RendererWorker.invokeAndTransfer('test.method', 'arg1', 'arg2')
  expect(mockRpc.invokeAndTransfer).toHaveBeenCalledWith('WebView.compatRendererWorkerInvokeAndTransfer', 'test.method', 'arg1', 'arg2')
})

test('error case - invoke', async () => {
  mockRpc.invoke.mockRejectedValue(new Error('test error'))
  await expect(RendererWorker.invoke('test.method')).rejects.toThrow('test error')
})

test('error case - invokeAndTransfer', async () => {
  mockRpc.invokeAndTransfer.mockRejectedValue(new Error('test error'))
  await expect(RendererWorker.invokeAndTransfer('test.method')).rejects.toThrow('test error')
})
