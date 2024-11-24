import { beforeEach, expect, jest, test } from '@jest/globals'

const Rpc = {
  invoke: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => Rpc)

const GetWebViews = await import('../src/parts/GetWebViews/GetWebViews.ts')

beforeEach(async () => {
  Rpc.invoke.mockReset()
})

test('getWebViews', async () => {
  const mockWebViews = [
    { id: 1, type: 'preview' },
    { id: 2, type: 'custom' },
  ]
  // @ts-ignore
  Rpc.invoke.mockResolvedValue(mockWebViews)
  const result = await GetWebViews.getWebViews()
  expect(result).toEqual(mockWebViews)
  expect(Rpc.invoke).toHaveBeenCalledWith('WebView.getWebViews')
})

test('error case', async () => {
  // @ts-ignore
  Rpc.invoke.mockRejectedValue(new Error('test error'))
  await expect(GetWebViews.getWebViews()).rejects.toThrow('test error')
})
