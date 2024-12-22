import { expect, jest, test } from '@jest/globals'
import * as Rpc from '../src/parts/Rpc/Rpc.ts'

test('invoke', async () => {
  const mockRpc = {
    invoke: jest.fn(),
    invokeAndTransfer: jest.fn(),
    send: jest.fn(),
  }
  Rpc.setRpc(mockRpc as any)
  await Rpc.invoke('test.method', 'arg1', 'arg2')
  expect(mockRpc.invoke).toHaveBeenCalledWith('test.method', 'arg1', 'arg2')
})

test('invokeAndTransfer', async () => {
  const mockRpc = {
    invoke: jest.fn(),
    invokeAndTransfer: jest.fn(),
    send: jest.fn(),
  }
  Rpc.setRpc(mockRpc as any)
  await Rpc.invokeAndTransfer('test.method', 'arg1', 'arg2')
  expect(mockRpc.invokeAndTransfer).toHaveBeenCalledWith('test.method', 'arg1', 'arg2')
})

test('error case - invoke', async () => {
  const mockRpc = {
    // @ts-ignore
    invoke: jest.fn().mockRejectedValue(new Error('test error')),
    invokeAndTransfer: jest.fn(),
    send: jest.fn(),
  }
  Rpc.setRpc(mockRpc as any)
  await expect(Rpc.invoke('test.method')).rejects.toThrow('test error')
})

test('error case - invokeAndTransfer', async () => {
  const mockRpc = {
    invoke: jest.fn(),
    // @ts-ignore
    invokeAndTransfer: jest.fn().mockRejectedValue(new Error('test error')),
    send: jest.fn(),
  }
  Rpc.setRpc(mockRpc as any)
  await expect(Rpc.invokeAndTransfer('test.method')).rejects.toThrow('test error')
})
