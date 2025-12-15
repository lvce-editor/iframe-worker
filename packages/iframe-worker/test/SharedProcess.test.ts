import { beforeEach, expect, jest, test } from '@jest/globals'

const Rpc = {
  invoke: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => Rpc)

const SharedProcess = await import('../src/parts/SharedProcess/SharedProcess.ts')

beforeEach(() => {
  Rpc.invoke.mockReset()
})

test.skip('invoke', async () => {
  await SharedProcess.invoke('test.method', 'arg1', 'arg2')
  expect(Rpc.invoke).toHaveBeenCalledWith('WebView.compatSharedProcessInvoke', 'test.method', 'arg1', 'arg2')
})

test.skip('error case', async () => {
  Rpc.invoke.mockImplementation(() => Promise.reject(new Error('test error')))
  await expect(SharedProcess.invoke('test.method')).rejects.toThrow('test error')
})
