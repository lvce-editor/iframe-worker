import { beforeEach, expect, jest, test } from '@jest/globals'

const SharedProcess = {
  invoke: jest.fn(),
}

jest.unstable_mockModule('../src/parts/SharedProcess/SharedProcess.ts', () => SharedProcess)

const WebViewServer = await import('../src/parts/WebViewServer/WebViewServer.ts')

beforeEach(async () => {
  SharedProcess.invoke.mockReset()
})

test('registerProtocol', async () => {
  await WebViewServer.registerProtocol()
  expect(SharedProcess.invoke).toHaveBeenCalledWith('WebViewServer.registerProtocol')
})

test('create', async () => {
  const previewServerId = 1
  await WebViewServer.create(previewServerId)
  expect(SharedProcess.invoke).toHaveBeenCalledWith('WebViewServer.create', previewServerId)
})

test('start', async () => {
  const previewServerId = 1
  const webViewPort = '3000'
  await WebViewServer.start(previewServerId, webViewPort)
  expect(SharedProcess.invoke).toHaveBeenCalledWith('WebViewServer.start', previewServerId, webViewPort)
})

test('setHandler', async () => {
  const previewServerId = 1
  const frameAncestors = 'http://localhost:3000'
  const webViewRoot = '/test/root'
  const contentSecurityPolicy = "default-src 'none'"
  const iframeContent = '<html></html>'

  await WebViewServer.setHandler(previewServerId, frameAncestors, webViewRoot, contentSecurityPolicy, iframeContent)

  expect(SharedProcess.invoke).toHaveBeenCalledWith(
    'WebViewServer.setHandler',
    previewServerId,
    frameAncestors,
    webViewRoot,
    contentSecurityPolicy,
    iframeContent,
  )
})

test('setInfo', async () => {
  const previewServerId = 1
  const webViewId = 'test-webview'
  const webViewRoot = '/test/root'
  const csp = ''
  const iframeContent = '<h1>hello world</h1>'
  await WebViewServer.setInfo(previewServerId, webViewId, webViewRoot, csp, iframeContent)
  expect(SharedProcess.invoke).toHaveBeenCalledWith('WebViewServer.setInfo', previewServerId, webViewId, webViewRoot, '', '<h1>hello world</h1>')
})

test('error case', async () => {
  const previewServerId = 1
  // @ts-ignore
  SharedProcess.invoke.mockRejectedValue(new Error('test error'))
  await expect(WebViewServer.create(previewServerId)).rejects.toThrow('test error')
})
