import { beforeEach, expect, jest, test } from '@jest/globals'

const Rpc = {
  invoke: jest.fn(),
  invokeAndTransfer: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => Rpc)

const RendererProcess = await import('../src/parts/RendererProcess/RendererProcess.ts')

beforeEach(() => {
  Rpc.invoke.mockReset()
  Rpc.invokeAndTransfer.mockReset()
})

test('invoke', async () => {
  const mockResult = { success: true }
  // @ts-ignore
  Rpc.invoke.mockResolvedValue(mockResult)
  const result = await RendererProcess.invoke('test.command', 'arg1', 'arg2')
  expect(result).toBe(mockResult)
  expect(Rpc.invoke).toHaveBeenCalledWith('WebView.compatRendererProcessInvoke', 'test.command', 'arg1', 'arg2')
})

test('invokeAndTransfer', async () => {
  const mockResult = { success: true }
  const transferable = new ArrayBuffer(8)
  // @ts-ignore
  Rpc.invokeAndTransfer.mockResolvedValue(mockResult)
  const result = await RendererProcess.invokeAndTransfer('test.command', transferable, 'arg1')
  expect(result).toBe(mockResult)
  expect(Rpc.invokeAndTransfer).toHaveBeenCalledWith('WebView.compatRendererProcessInvokeAndTransfer', 'test.command', transferable, 'arg1')
})

test('invoke - error case', async () => {
  // @ts-ignore
  Rpc.invoke.mockRejectedValue(new Error('test error'))
  await expect(RendererProcess.invoke('test.command')).rejects.toThrow('test error')
})

test('invokeAndTransfer - error case', async () => {
  const transferable = new ArrayBuffer(8)
  // @ts-ignore
  Rpc.invokeAndTransfer.mockRejectedValue(new Error('test error'))
  await expect(RendererProcess.invokeAndTransfer('test.command', transferable)).rejects.toThrow('test error')
})
