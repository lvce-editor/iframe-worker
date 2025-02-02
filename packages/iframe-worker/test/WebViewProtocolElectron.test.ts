import { beforeEach, expect, jest, test } from '@jest/globals'

const WebViewServer = {
  registerProtocol: jest.fn(),
  create: jest.fn(),
  setInfo: jest.fn(),
}

jest.unstable_mockModule('../src/parts/WebViewServer/WebViewServer.ts', () => WebViewServer)

const WebViewProtocolElectron = await import('../src/parts/WebViewProtocolElectron/WebViewProtocolElectron.ts')

beforeEach(() => {
  WebViewServer.registerProtocol.mockReset()
  WebViewServer.create.mockReset()
})

test('register', async () => {
  const previewServerId = 1
  const port = '3000'
  const root = '/test/root'
  const frameAncestors = ''
  const csp = ''
  const iframeContent = ''
  const webViewId = 'test.test'
  const remotePathPrefix = '/remote'
  await WebViewProtocolElectron.register(previewServerId, port, root, frameAncestors, csp, iframeContent, webViewId, remotePathPrefix)
  expect(WebViewServer.registerProtocol).toHaveBeenCalled()
  expect(WebViewServer.create).toHaveBeenCalledWith(previewServerId, undefined)
})

test('error case', async () => {
  const previewServerId = 1
  const port = '3000'
  const root = '/test/root'
  const frameAncestors = ''
  const csp = ''
  const iframeContent = ''
  const webViewId = 'test.test'
  const remotePathPrefix = '/remote'
  WebViewServer.registerProtocol.mockImplementation(() => Promise.reject(new Error('test error')))
  await expect(
    WebViewProtocolElectron.register(previewServerId, port, root, frameAncestors, csp, iframeContent, webViewId, remotePathPrefix),
  ).rejects.toThrow('test error')
})
