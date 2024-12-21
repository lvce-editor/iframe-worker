import { beforeEach, expect, jest, test } from '@jest/globals'

const Rpc = {
  invoke: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => Rpc)

const Main = await import('../src/parts/Main/Main.ts')

beforeEach(() => {
  Rpc.invoke.mockReset()
})

test('main - should be a function', () => {
  expect(typeof Main.main).toBe('function')
})

test('main - should execute successfully', async () => {
  await Main.main()
  expect(Rpc.invoke).toHaveBeenCalledTimes(1)
  expect(Rpc.invoke).toHaveBeenCalledWith('Main.main')
})

test('main - should handle errors', async () => {
  // @ts-ignore
  Rpc.invoke.mockRejectedValue(new Error('test error'))
  await expect(Main.main()).rejects.toThrow('test error')
})
