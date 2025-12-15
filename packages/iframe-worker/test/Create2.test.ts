import { beforeEach, expect, jest, test } from '@jest/globals'
import { RpcId, RendererWorker } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

const ExtensionHostWorker = {
  invoke: jest.fn(),
  invokeAndTransfer: jest.fn(),
}

const GetWebViews = {
  getWebViews: jest.fn(),
}

const Location = {
  getHost: jest.fn(),
  getOrigin: jest.fn(),
  getProtocol: jest.fn(),
}

const RendererProcess = {
  invoke: jest.fn(),
  invokeAndTransfer: jest.fn(),
}

const SharedProcess = {
  invoke: jest.fn(),
}

const WebViewProtocol = {
  register: jest.fn(),
}

jest.unstable_mockModule('../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts', () => ExtensionHostWorker)
jest.unstable_mockModule('../src/parts/GetWebViews/GetWebViews.ts', () => GetWebViews)
jest.unstable_mockModule('../src/parts/Location/Location.ts', () => Location)
jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.ts', () => RendererProcess)
jest.unstable_mockModule('../src/parts/SharedProcess/SharedProcess.ts', () => SharedProcess)
jest.unstable_mockModule('../src/parts/WebViewProtocol/WebViewProtocol.ts', () => WebViewProtocol)

const Create2 = await import('../src/parts/Create2/Create2.ts')

beforeEach(() => {
  jest.resetAllMocks()
  RpcRegistry.remove(RpcId.RendererWorker)
  Location.getProtocol.mockReturnValue('http:')
  Location.getHost.mockReturnValue('localhost:3000')
  Location.getOrigin.mockReturnValue('http://localhost:3000')
  // @ts-ignore
  GetWebViews.getWebViews.mockResolvedValue([
    {
      contentSecurityPolicy: ["default-src 'none'"],
      elements: [
        {
          type: 'title',
          value: 'Test',
        },
        {
          path: 'index.js',
          type: 'script',
        },
      ],
      id: 'test-webview',
      path: '/test',
      sandbox: ['allow-scripts'],
    },
  ])
})

test.skip('create2 - basic functionality', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async () => {},
    'WebView.getSavedState': async () => [],
  })
  const params = {
    id: 1,
    isGitpod: false,
    platform: 1,
    previewServerId: 1,
    uri: 'test://uri',
    webViewId: 'test-webview',
    webViewPort: '3000',
  }

  const result = await Create2.create2(params)

  expect(GetWebViews.getWebViews).toHaveBeenCalled()
  expect(mockRpc.invocations).toEqual([['ExtensionHostManagement.activateByEvent', 'onWebView:test-webview'], ['WebView.getSavedState']])
  expect(WebViewProtocol.register).toHaveBeenCalled()
  expect(RendererProcess.invoke).toHaveBeenCalledTimes(2)
  expect(ExtensionHostWorker.invokeAndTransfer).toHaveBeenCalled()
  expect(ExtensionHostWorker.invoke).toHaveBeenCalled()
  expect(result).toBeDefined()
  expect(result).toEqual({
    csp: "default-src 'none';",
    iframeSrc: expect.any(String),
    origin: '*',
    portId: 1,
    sandbox: ['allow-scripts', 'allow-scripts'],
  })
})

test.skip('create2 - remote platform', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async () => {},
    'WebView.getSavedState': async () => [],
  })
  // @ts-ignore
  SharedProcess.invoke.mockResolvedValue('/test/root')

  const params = {
    id: 1,
    isGitpod: false,
    platform: 3,
    previewServerId: 1,
    uri: 'test://uri',
    webViewId: 'test-webview',
    webViewPort: '3000',
  }

  const result = await Create2.create2(params)

  expect(SharedProcess.invoke).toHaveBeenCalledWith('Platform.getRoot')
  expect(result).toBeDefined()
})

test.skip('create2 - no iframe result', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async () => {},
    'WebView.getSavedState': async () => [],
  })
  // @ts-ignore
  GetWebViews.getWebViews.mockResolvedValue([])

  const params = {
    id: 1,
    isGitpod: false,
    platform: 1,
    previewServerId: 1,
    uri: 'test://uri',
    webViewId: 'test-webview',
    webViewPort: '3000',
  }

  const result = await Create2.create2(params)

  expect(result).toBeUndefined()
})

test.skip('error case', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async () => {},
    'WebView.getSavedState': async () => [],
  })
  // @ts-ignore
  GetWebViews.getWebViews.mockRejectedValue(new Error('test error'))

  const params = {
    id: 1,
    isGitpod: false,
    platform: 1,
    previewServerId: 1,
    uri: 'test://uri',
    webViewId: 'test-webview',
    webViewPort: '3000',
  }

  await expect(Create2.create2(params)).rejects.toThrow('test error')
})
