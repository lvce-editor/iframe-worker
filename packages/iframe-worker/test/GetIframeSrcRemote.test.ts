import { expect, test } from '@jest/globals'
import * as GetIframeSrcRemote from '../src/parts/GetIframeSrcRemote/GetIframeSrcRemote.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('webview not found', () => {
  const webViews: any[] = []
  const webViewPort = 3000
  const webViewId = 1
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
  )

  expect(result).toBe(undefined)
})

test('webview with no path', () => {
  const webView = { id: 1, elements: [] }
  const webViews = [webView]
  const webViewPort = 3000
  const webViewId = 1
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
  )

  expect(result).toBe(undefined)
})

test('webview with file path', () => {
  const webView = { id: 1, path: '/test/index.html', elements: [], uri: 'file:///test' }
  const webViews = [webView]
  const webViewPort = 3000
  const webViewId = 1
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
  )

  expect(result).toEqual({
    srcDoc: '',
    iframeSrc: 'http://localhost:3000',
    webViewRoot: 'file:///test',
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
  })
})

test('electron platform', () => {
  const webView = { id: 1, path: '/test/index.html', elements: [], uri: 'file:///test' }
  const webViews = [webView]
  const webViewPort = 3000
  const webViewId = 1
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationHost,
    isGitpod,
    root,
    PlatformType.Electron,
    assetDir,
  )

  expect(result).toEqual({
    srcDoc: '',
    iframeSrc: 'lvce-oss-webview://-/test/',
    webViewRoot: 'file:///test/index.html',
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
  })
})

test('windows path', () => {
  const webView = { id: 1, path: 'C:/test/index.html', elements: [], uri: 'file:///c:/test' }
  const webViews = [webView]
  const webViewPort = 3000
  const webViewId = 1
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
  )

  expect(result).toEqual({
    srcDoc: '',
    iframeSrc: 'http://localhost:3000',
    webViewRoot: 'file:///c:/test',
    iframeContent: '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n  </head>\n</html>\n',
  })
})

test('no path in webview', () => {
  const webView = { id: 1, elements: [], uri: '' }
  const webViews = [webView]
  const webViewPort = 3000
  const webViewId = 1
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const root = '/root'
  const assetDir = ''

  const result = GetIframeSrcRemote.getIframeSrcRemote(
    webViews,
    webViewPort,
    webViewId,
    locationProtocol,
    locationHost,
    isGitpod,
    root,
    PlatformType.Remote,
    assetDir,
  )

  expect(result).toBe(undefined)
})
