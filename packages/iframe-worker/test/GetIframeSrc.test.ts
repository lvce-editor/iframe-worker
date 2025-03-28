import { beforeEach, expect, jest, test } from '@jest/globals'
import * as GetIframeSrc from '../src/parts/GetIframeSrc/GetIframeSrc.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

const GetIframeSrcWeb = {
  getIframeSrc: jest.fn(),
}

const GetIframeSrcRemote = {
  getIframeSrcRemote: jest.fn(),
}

const GetWebView = {
  getWebView: jest.fn(),
}

jest.unstable_mockModule('../src/parts/GetIframeSrcWeb/GetIframeSrcWeb.ts', () => GetIframeSrcWeb)
jest.unstable_mockModule('../src/parts/GetIframeSrcRemote/GetIframeSrcRemote.ts', () => GetIframeSrcRemote)
jest.unstable_mockModule('../src/parts/GetWebView/GetWebView.ts', () => GetWebView)

const webViewScheme = 'lvce-oss-webview:'

beforeEach(async () => {
  GetIframeSrcWeb.getIframeSrc.mockReset()
  GetIframeSrcRemote.getIframeSrcRemote.mockReset()
  GetWebView.getWebView.mockReset()
})

test('web platform', () => {
  const webView = { id: '1' }
  const webViews: readonly any[] = [webView]
  const webViewId = '1'
  const webViewPort = '3000'
  const root = '/root'
  const isGitpod = false
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const locationOrigin = 'http://localhost:3000'
  const expectedResult = { srcDoc: 'test' }
  const assetDir = ''
  const useNewWebViewHandler = false

  GetWebView.getWebView.mockReturnValue(webView)
  GetIframeSrcWeb.getIframeSrc.mockReturnValue(expectedResult)

  const result = GetIframeSrc.getIframeSrc(
    webViews,
    webViewId,
    webViewPort,
    root,
    isGitpod,
    locationProtocol,
    locationHost,
    locationOrigin,
    PlatformType.Web,
    assetDir,
    webViewScheme,
    useNewWebViewHandler,
  )

  expect(result).toBe(undefined)
})

test('remote platform', () => {
  const webViews: readonly any[] = []
  const webViewId = '1'
  const webViewPort = '3000'
  const root = '/root'
  const isGitpod = false
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const locationOrigin = 'http://localhost:3000'
  const webView = { id: 1 }
  const expectedResult = { srcDoc: 'test' }
  const assetDir = ''
  const useNewWebViewHandler = false

  GetWebView.getWebView.mockReturnValue(webView)
  GetIframeSrcRemote.getIframeSrcRemote.mockReturnValue(expectedResult)

  const result = GetIframeSrc.getIframeSrc(
    webViews,
    webViewId,
    webViewPort,
    root,
    isGitpod,
    locationProtocol,
    locationHost,
    locationOrigin,
    PlatformType.Remote,
    assetDir,
    webViewScheme,
    useNewWebViewHandler,
  )

  expect(result).toBe(undefined)
})

test('error case', () => {
  const webViews: readonly any[] = []
  const webViewId = '1'
  const webViewPort = '3000'
  const root = '/root'
  const isGitpod = false
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const locationOrigin = 'http://localhost:3000'
  const assetDir = ''
  const useNewWebViewHandler = false

  GetWebView.getWebView.mockImplementation(() => {
    throw new Error('test error')
  })

  expect(() =>
    GetIframeSrc.getIframeSrc(
      webViews,
      webViewId,
      webViewPort,
      root,
      isGitpod,
      locationProtocol,
      locationHost,
      locationOrigin,
      PlatformType.Web,
      assetDir,
      webViewScheme,
      useNewWebViewHandler,
    ),
  ).toThrow(/Failed to construct webview iframe src: TypeError: Cannot destructure property 'remotePath'/)
})
