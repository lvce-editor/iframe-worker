import { beforeEach, expect, jest, test } from '@jest/globals'

const Rpc = {
  invoke: jest.fn(),
  invokeAndTransfer: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => Rpc)

const ExtensionHostWorker = await import('../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts')

beforeEach(() => {
  Rpc.invoke.mockReset()
  Rpc.invokeAndTransfer.mockReset()
})

test('invoke', async () => {
  await ExtensionHostWorker.invoke('test.method', 'arg1', 'arg2')
  expect(Rpc.invoke).toHaveBeenCalledWith('WebView.compatExtensionHostWorkerInvoke', 'test.method', 'arg1', 'arg2')
})

test('invokeAndTransfer', async () => {
  await ExtensionHostWorker.invokeAndTransfer('test.method', 'arg1', 'arg2')
  expect(Rpc.invokeAndTransfer).toHaveBeenCalledWith('WebView.compatExtensionHostWorkerInvokeAndTransfer', 'test.method', 'arg1', 'arg2')
})

test('error case', async () => {
  Rpc.invoke.mockImplementation(() => Promise.reject(new Error('test error')))
  await expect(ExtensionHostWorker.invoke('test.method')).rejects.toThrow('test error')
})
