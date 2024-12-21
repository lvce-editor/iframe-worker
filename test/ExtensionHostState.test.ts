import { beforeEach, expect, jest, test } from '@jest/globals'

const ExtensionHostWorker = {
  invoke: jest.fn(),
}

const Rpc = {
  invoke: jest.fn(),
}

jest.unstable_mockModule('../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts', () => ExtensionHostWorker)
jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => Rpc)

const ExtensionHostState = await import('../src/parts/ExtensionHost/ExtensionHostState.ts')

beforeEach(() => {
  jest.resetAllMocks()
})

test('saveState', async () => {
  const mockState = { value: 123 }
  // @ts-ignore
  ExtensionHostWorker.invoke.mockResolvedValue(mockState)
  const result = await ExtensionHostState.saveState()
  expect(ExtensionHostWorker.invoke).toHaveBeenCalledWith('SaveState.saveState')
  expect(result).toBe(mockState)
})

test('getSavedState', async () => {
  const mockState = { value: 123 }
  // @ts-ignore
  Rpc.invoke.mockResolvedValue(mockState)
  const result = await ExtensionHostState.getSavedState()
  expect(Rpc.invoke).toHaveBeenCalledWith('WebView.getSavedState')
  expect(result).toBe(mockState)
})

test.skip('error case - saveState', async () => {
  ExtensionHostWorker.invoke.mockImplementation(() => Promise.reject(new Error('test error')))
  await expect(ExtensionHostState.saveState()).rejects.toThrow('test error')
})

test.skip('error case - getSavedState', async () => {
  Rpc.invoke.mockImplementation(() => Promise.reject(new Error('test error')))
  await expect(ExtensionHostState.getSavedState()).rejects.toThrow('test error')
})
