import { beforeEach, expect, jest, test } from '@jest/globals'

const ExtensionHostWorker = {
  invoke: jest.fn(),
  invokeAndTransfer: jest.fn(),
}

const GetWebViews = {
  getWebViews: jest.fn(),
}

const Location = {
  getProtocol: jest.fn(),
  getHost: jest.fn(),
  getOrigin: jest.fn(),
}

const RendererProcess = {
  invoke: jest.fn(),
  invokeAndTransfer: jest.fn(),
}

const Rpc = {
  invoke: jest.fn(),
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
jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => Rpc)
jest.unstable_mockModule('../src/parts/SharedProcess/SharedProcess.ts', () => SharedProcess)
jest.unstable_mockModule('../src/parts/WebViewProtocol/WebViewProtocol.ts', () => WebViewProtocol)

const Create2 = await import('../src/parts/Create2/Create2.ts')

beforeEach(() => {
  jest.resetAllMocks()
  Location.getProtocol.mockReturnValue('http:')
  Location.getHost.mockReturnValue('localhost:3000')
  Location.getOrigin.mockReturnValue('http://localhost:3000')
  // @ts-ignore
  GetWebViews.getWebViews.mockResolvedValue([
    {
      id: 'test-webview',
      contentSecurityPolicy: ["default-src 'none'"],
      sandbox: ['allow-scripts'],
      elements: [
        {
          type: 'title',
          value: 'Test',
        },
        {
          type: 'script',
          path: 'index.js',
        },
      ],
    },
  ])
})

test('create2 - basic functionality', async () => {
  const params = {
    id: 1,
    webViewPort: '3000',
    webViewId: 'test-webview',
    previewServerId: 1,
    uri: 'test://uri',
    platform: 1,
    isGitpod: false,
  }

  const result = await Create2.create2(params)

  expect(GetWebViews.getWebViews).toHaveBeenCalled()
  expect(Rpc.invoke).toHaveBeenCalledWith('ExtensionHostManagement.activateByEvent', 'onWebView:test-webview')
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
    srcDoc: '',
  })
})

test('create2 - remote platform', async () => {
  // @ts-ignore
  SharedProcess.invoke.mockResolvedValue('/test/root')

  const params = {
    id: 1,
    webViewPort: '3000',
    webViewId: 'test-webview',
    previewServerId: 1,
    uri: 'test://uri',
    platform: 3,
    isGitpod: false,
  }

  const result = await Create2.create2(params)

  expect(SharedProcess.invoke).toHaveBeenCalledWith('Platform.getRoot')
  expect(result).toBeDefined()
})

test('create2 - no iframe result', async () => {
  // @ts-ignore
  GetWebViews.getWebViews.mockResolvedValue([])

  const params = {
    id: 1,
    webViewPort: '3000',
    webViewId: 'test-webview',
    previewServerId: 1,
    uri: 'test://uri',
    platform: 1,
    isGitpod: false,
  }

  const result = await Create2.create2(params)

  expect(result).toBeUndefined()
})

test('error case', async () => {
  // @ts-ignore
  GetWebViews.getWebViews.mockRejectedValue(new Error('test error'))

  const params = {
    id: 1,
    webViewPort: '3000',
    webViewId: 'test-webview',
    previewServerId: 1,
    uri: 'test://uri',
    platform: 1,
    isGitpod: false,
  }

  await expect(Create2.create2(params)).rejects.toThrow('test error')
})
