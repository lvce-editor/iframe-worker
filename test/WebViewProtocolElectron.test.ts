import { beforeEach, expect, jest, test } from '@jest/globals'

const WebViewServer = {
  registerProtocol: jest.fn(),
  create: jest.fn(),
}

jest.unstable_mockModule('../src/parts/WebViewServer/WebViewServer.ts', () => WebViewServer)

const WebViewProtocolElectron = await import('../src/parts/WebViewProtocolElectron/WebViewProtocolElectron.ts')

beforeEach(() => {
  WebViewServer.registerProtocol.mockReset()
  WebViewServer.create.mockReset()
})

test('register', async () => {
  const previewServerId = 1
  await WebViewProtocolElectron.register(previewServerId)
  expect(WebViewServer.registerProtocol).toHaveBeenCalled()
  expect(WebViewServer.create).toHaveBeenCalledWith(previewServerId)
})

test('error case', async () => {
  const previewServerId = 1
  WebViewServer.registerProtocol.mockImplementation(() => Promise.reject(new Error('test error')))
  await expect(WebViewProtocolElectron.register(previewServerId)).rejects.toThrow('test error')
})
