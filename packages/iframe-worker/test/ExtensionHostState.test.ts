import { beforeEach, expect, jest, test } from '@jest/globals'
import { RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

const ExtensionHostWorker = {
  invoke: jest.fn(),
}

const ExtensionHostState = await import('../src/parts/ExtensionHost/ExtensionHostState.ts')

beforeEach(() => {
  jest.resetAllMocks()
  RpcRegistry.remove(RpcId.RendererWorker)
})

test.skip('saveState', async () => {
  const mockState = { value: 123 }
  // @ts-ignore
  ExtensionHostWorker.invoke.mockResolvedValue(mockState)
  const result = await ExtensionHostState.saveState()
  expect(ExtensionHostWorker.invoke).toHaveBeenCalledWith('SaveState.saveState')
  expect(result).toBe(mockState)
})

test.skip('getSavedState', async () => {
  const mockState = { value: 123 }
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.getSavedState': async () => mockState,
  })
  const result = await ExtensionHostState.getSavedState()
  expect(result).toBe(mockState)
  expect(mockRpc.invocations).toEqual([['WebView.getSavedState']])
})

test.skip('error case - saveState', async () => {
  ExtensionHostWorker.invoke.mockImplementation(() => Promise.reject(new Error('test error')))
  await expect(ExtensionHostState.saveState()).rejects.toThrow('test error')
})

test.skip('error case - getSavedState', async () => {
  // @ts-ignore
  Rpc.invoke.mockImplementation(() => Promise.reject(new Error('test error')))
  await expect(ExtensionHostState.getSavedState()).rejects.toThrow('test error')
})
