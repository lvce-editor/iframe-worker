import { expect, test } from '@jest/globals'
import * as GetIframeSrcRemote from '../src/parts/GetIframeSrcRemote/GetIframeSrcRemote.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

const webViewScheme = 'lvce-oss-webview'

test('webview not found', () => {
  const webViews: any[] = []
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''
  const useNewWebViewHandler = false

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationOrigin,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
    webViewScheme,
    useNewWebViewHandler,
  )

  expect(result).toBe(undefined)
})

test('webview with no path', () => {
  const webView = { elements: [], id: '1' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''
  const useNewWebViewHandler = false

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationOrigin,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
    webViewScheme,
    useNewWebViewHandler,
  )

  expect(result).toBe(undefined)
})

test('webview with file path', () => {
  const webView = { elements: [], id: '1', path: '/test/index.html', uri: 'file:///test' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''
  const useNewWebViewHandler = false

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationOrigin,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
    webViewScheme,
    useNewWebViewHandler,
  )

  expect(result).toEqual({
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
    iframeSrc: 'http://localhost:3000',
    webViewRoot: 'file:///test',
  })
})

test('electron platform', () => {
  const webView = { elements: [], id: '1', path: '/test/index.html', uri: 'file:///test' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''
  const useNewWebViewHandler = false

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationOrigin,
    locationHost,
    isGitpod,
    root,
    PlatformType.Electron,
    assetDir,
    webViewScheme,
    useNewWebViewHandler,
  )

  expect(result).toEqual({
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
    iframeSrc: 'lvce-oss-webview://1',
    webViewRoot: 'file:///test/index.html',
  })
})

test('windows path', () => {
  const webView = { elements: [], id: '1', path: 'C:/test/index.html', uri: 'file:///c:/test' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''
  const useNewWebViewHandler = false

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationOrigin,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
    webViewScheme,
    useNewWebViewHandler,
  )

  expect(result).toEqual({
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
    iframeSrc: 'http://localhost:3000',
    webViewRoot: 'file:///c:/test',
  })
})

test('no path in webview', () => {
  const webView = { elements: [], id: '1', uri: '' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''
  const useNewWebViewHandler = false

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationOrigin,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
    webViewScheme,
    useNewWebViewHandler,
  )

  expect(result).toBe(undefined)
})
