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
  )

  expect(result).toBe(undefined)
})

test('webview with no path', () => {
  const webView = { id: '1', elements: [] }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

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
  )

  expect(result).toBe(undefined)
})

test('webview with file path', () => {
  const webView = { id: '1', path: '/test/index.html', elements: [], uri: 'file:///test' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

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
  )

  expect(result).toEqual({
    iframeSrc: 'http://localhost:3000',
    webViewRoot: 'file:///test',
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
  })
})

test('electron platform', () => {
  const webView = { id: '1', path: '/test/index.html', elements: [], uri: 'file:///test' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

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
  )

  expect(result).toEqual({
    iframeSrc: 'lvce-oss-webview://1',
    webViewRoot: 'file:///test/index.html',
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
  })
})

test('windows path', () => {
  const webView = { id: '1', path: 'C:/test/index.html', elements: [], uri: 'file:///c:/test' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

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
  )

  expect(result).toEqual({
    iframeSrc: 'http://localhost:3000',
    webViewRoot: 'file:///c:/test',
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
  })
})

test('no path in webview', () => {
  const webView = { id: '1', elements: [], uri: '' }
  const webViews = [webView]
  const webViewPort = '3000'
  const webViewId = '1'
  const locationProtocol = 'http:'
  const locationOrigin = 'http:localhost:3000'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

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
  )

  expect(result).toBe(undefined)
})
