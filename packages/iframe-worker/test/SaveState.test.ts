import { beforeEach, expect, jest, test } from '@jest/globals'
import * as RpcState from '../src/parts/RpcState/RpcState.ts'
import * as SaveState from '../src/parts/SaveState/SaveState.ts'

beforeEach(() => {
  RpcState.reset()
})

test('saveState - empty state', async () => {
  const result = await SaveState.saveState()
  expect(result).toEqual([])
})

test('saveState - with states', async () => {
  const mockRpc = {
    // @ts-ignore
    invoke: jest.fn().mockResolvedValue({ state: 'test' }),
  } as any
  RpcState.set(1, {
    origin: 'test',
    portId: 1,
    rpc: mockRpc,
    webViewId: 'test-id',
    webViewUid: 1,
  })
  const result = await SaveState.saveState()
  expect(result).toEqual([
    {
      key: 'test-id',
      value: { state: 'test' },
    },
  ])
  expect(mockRpc.invoke).toHaveBeenCalledWith('WebView.saveState', 1)
})

test('saveState - handles errors', async () => {
  const mockRpc = {
    // @ts-ignore
    invoke: jest.fn().mockRejectedValue(new Error('test error')),
  } as any
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  RpcState.set(1, {
    origin: 'test',
    portId: 1,
    rpc: mockRpc,
    webViewId: 'test-id',
    webViewUid: 1,
  })
  const result = await SaveState.saveState()
  expect(result).toEqual([])
  expect(consoleSpy).toHaveBeenCalledTimes(1)
  expect(consoleSpy).toHaveBeenCalledWith(new Error('Failed to save state: test error'))
  consoleSpy.mockRestore()
})

test('saveState - multiple states', async () => {
  const mockRpc1 = {
    // @ts-ignore
    invoke: jest.fn().mockResolvedValue({ state: 'test1' }),
  } as any
  const mockRpc2 = {
    // @ts-ignore
    invoke: jest.fn().mockResolvedValue({ state: 'test2' }),
  } as any
  RpcState.set(1, {
    origin: 'test',
    portId: 1,
    rpc: mockRpc1,
    webViewId: 'test-id-1',
    webViewUid: 1,
  })
  RpcState.set(2, {
    origin: 'test',
    portId: 2,
    rpc: mockRpc2,
    webViewId: 'test-id-2',
    webViewUid: 2,
  })
  const result = await SaveState.saveState()
  expect(result).toEqual([
    {
      key: 'test-id-1',
      value: { state: 'test1' },
    },
    {
      key: 'test-id-2',
      value: { state: 'test2' },
    },
  ])
})
