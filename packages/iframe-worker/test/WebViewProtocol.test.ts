import { beforeEach, expect, jest, test } from '@jest/globals'

const GetWebViewProtocolModule = {
  getModule: jest.fn(),
}

jest.unstable_mockModule('../src/parts/GetWebViewProtocolModule/GetWebViewProtocolModule.ts', () => GetWebViewProtocolModule)

const WebViewProtocol = await import('../src/parts/WebViewProtocol/WebViewProtocol.ts')

beforeEach(() => {
  GetWebViewProtocolModule.getModule.mockReset()
})

test('register', async () => {
  const mockRegisterFn = jest.fn()
  GetWebViewProtocolModule.getModule.mockReturnValue(mockRegisterFn)

  const previewServerId = 1
  const webViewPort = '3000'
  const frameAncestors = 'http://localhost:3000'
  const webViewRoot = '/test/root'
  const csp = "default-src 'none'"
  const iframeContent = '<html></html>'
  const platform = 1
  const webViewId = 'test-webview'
  const remotePathPrefix = '/remote'

  await WebViewProtocol.register(previewServerId, webViewPort, frameAncestors, webViewRoot, csp, iframeContent, platform, webViewId, remotePathPrefix)

  expect(GetWebViewProtocolModule.getModule).toHaveBeenCalledWith(platform)
  expect(mockRegisterFn).toHaveBeenCalledWith(
    previewServerId,
    webViewPort,
    frameAncestors,
    webViewRoot,
    csp,
    iframeContent,
    webViewId,
    remotePathPrefix,
    undefined,
  )
})

test('error case', async () => {
  // @ts-expect-error
  const mockRegisterFn = jest.fn().mockRejectedValue(new Error('test error'))
  GetWebViewProtocolModule.getModule.mockReturnValue(mockRegisterFn)

  const previewServerId = 1
  const webViewPort = '3000'
  const frameAncestors = 'http://localhost:3000'
  const webViewRoot = '/test/root'
  const csp = "default-src 'none'"
  const iframeContent = '<html></html>'
  const platform = 1
  const webViewId = 'test-webview'
  const remotePathPrefix = '/remote'

  await expect(
    WebViewProtocol.register(previewServerId, webViewPort, frameAncestors, webViewRoot, csp, iframeContent, platform, webViewId, remotePathPrefix),
  ).rejects.toThrow('test error')
})
