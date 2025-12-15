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
  getPort: jest.fn(),
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

const CreateWebViewRpc = {
  createWebViewRpc: jest.fn(),
}

jest.unstable_mockModule('../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts', () => ExtensionHostWorker)
jest.unstable_mockModule('../src/parts/GetWebViews/GetWebViews.ts', () => GetWebViews)
jest.unstable_mockModule('../src/parts/Location/Location.ts', () => Location)
jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.ts', () => RendererProcess)
jest.unstable_mockModule('../src/parts/SharedProcess/SharedProcess.ts', () => SharedProcess)
jest.unstable_mockModule('../src/parts/WebViewProtocol/WebViewProtocol.ts', () => WebViewProtocol)
jest.unstable_mockModule('../src/parts/CreateWebViewRpc/CreateWebViewRpc.ts', () => CreateWebViewRpc)

const Create3 = await import('../src/parts/Create3/Create3.ts')

beforeEach(() => {
  jest.resetAllMocks()
  RpcRegistry.remove(RpcId.RendererWorker)
  Location.getProtocol.mockReturnValue('http:')
  Location.getHost.mockReturnValue('localhost:3000')
  Location.getOrigin.mockReturnValue('http://localhost:3000')
  Location.getPort.mockReturnValue('3000')
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
      path: '/test/index.html',
      remotePath: '/test/index.html',
      sandbox: ['allow-scripts'],
      selector: ['.xyz'],
      uri: 'test://uri',
    },
  ])
})

<<<<<<< HEAD
test('create3 - basic functionality', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async () => {},
    'WebView.getSavedState': async () => [],
  })
=======
test.skip('create3 - basic functionality', async () => {
>>>>>>> origin/main
  const params = {
    assetDir: '',
    id: 1,
    isGitpod: false,
    platform: 1,
    uri: 'test://example.xyz',
    webViewScheme: 'lvce-oss-webview',
  }

  const result = await Create3.create3(params)

  expect(GetWebViews.getWebViews).toHaveBeenCalled()
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHostManagement.activateByEvent', 'onWebView:test-webview'],
    ['WebView.getSavedState'],
  ])
  expect(WebViewProtocol.register).toHaveBeenCalled()
  expect(RendererProcess.invoke).toHaveBeenCalledTimes(2)
  expect(result).toBeDefined()
  expect(result).toEqual({
    csp: "default-src 'none';",
    iframeSrc: expect.any(String),
    origin: '*',
    portId: 1,
    sandbox: ['allow-scripts', 'allow-scripts'],
  })
})

<<<<<<< HEAD
test('create3 - remote platform', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async () => {},
    'WebView.getSavedState': async () => [],
  })
=======
test.skip('create3 - remote platform', async () => {
>>>>>>> origin/main
  // @ts-ignore
  SharedProcess.invoke.mockResolvedValue('/test/root')

  const params = {
    assetDir: '',
    id: 1,
    isGitpod: false,
    platform: 3,
    uri: 'test://example.xyz',
    webViewScheme: 'lvce-oss-webview',
  }

  const result = await Create3.create3(params)

  expect(SharedProcess.invoke).toHaveBeenCalledWith('Platform.getRoot')
  expect(result).toBeDefined()
})

test.skip('create3 - no iframe result', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async () => {},
    'WebView.getSavedState': async () => [],
  })
  // @ts-ignore
  GetWebViews.getWebViews.mockResolvedValue([])

  const params = {
    assetDir: '',
    id: 1,
    isGitpod: false,
    platform: 1,
    uri: 'test://example.xyz',
    webViewScheme: 'lvce-oss-webview',
  }

  const result = await Create3.create3(params)

  expect(result).toBeUndefined()
})

<<<<<<< HEAD
test('error case', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async () => {},
    'WebView.getSavedState': async () => [],
  })
=======
test.skip('error case', async () => {
>>>>>>> origin/main
  // @ts-ignore
  GetWebViews.getWebViews.mockRejectedValue(new Error('test error'))

  const params = {
    assetDir: '',
    id: 1,
    isGitpod: false,
    platform: 1,
    uri: 'test://example.xyz',
    webViewScheme: 'lvce-oss-webview',
  }

  await expect(Create3.create3(params)).rejects.toThrow('test error')
})
