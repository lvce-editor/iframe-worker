import { expect, jest, test } from '@jest/globals'
import * as GetIframeSrc from '../src/parts/GetIframeSrc/GetIframeSrc.ts'
import * as GetIframeSrcWeb from '../src/parts/GetIframeSrcWeb/GetIframeSrcWeb.ts'
import * as GetIframeSrcRemote from '../src/parts/GetIframeSrcRemote/GetIframeSrcRemote.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('web platform', () => {
  const webViews = [
    {
      id: 'test-webview',
      path: '/test/path',
    },
  ]
  const webViewId = 'test-webview'
  const webViewPort = 3000
  const root = '/root'
  const isGitpod = false
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const locationOrigin = 'http://localhost:3000'
  const platform = PlatformType.Web

  jest.spyOn(GetIframeSrcWeb, 'getIframeSrc').mockReturnValue({
    srcDoc: '',
    iframeSrc: 'blob:123',
    webViewRoot: '',
    iframeContent: '',
  })

  const result = GetIframeSrc.getIframeSrc(webViews, webViewId, webViewPort, root, isGitpod, locationProtocol, locationHost, locationOrigin, platform)

  expect(result).toEqual({
    srcDoc: '',
    iframeSrc: 'blob:123',
    webViewRoot: '',
    iframeContent: '',
  })
})

test('remote platform', () => {
  const webViews = [
    {
      id: 'test-webview',
      path: '/test/path',
    },
  ]
  const webViewId = 'test-webview'
  const webViewPort = 3000
  const root = '/root'
  const isGitpod = false
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const locationOrigin = 'http://localhost:3000'
  const platform = PlatformType.Remote

  jest.spyOn(GetIframeSrcRemote, 'getIframeSrcRemote').mockReturnValue({
    srcDoc: '',
    iframeSrc: 'http://localhost:3000',
    webViewRoot: '/root/test',
    iframeContent: '<html></html>',
  })

  const result = GetIframeSrc.getIframeSrc(webViews, webViewId, webViewPort, root, isGitpod, locationProtocol, locationHost, locationOrigin, platform)

  expect(result).toEqual({
    srcDoc: '',
    iframeSrc: 'http://localhost:3000',
    webViewRoot: '/root/test',
    iframeContent: '<html></html>',
  })
})

test('error handling', () => {
  const webViews = null
  const webViewId = 'test-webview'
  const webViewPort = 3000
  const root = '/root'
  const isGitpod = false
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const locationOrigin = 'http://localhost:3000'
  const platform = PlatformType.Web

  expect(() =>
    GetIframeSrc.getIframeSrc(webViews, webViewId, webViewPort, root, isGitpod, locationProtocol, locationHost, locationOrigin, platform),
  ).toThrow('Failed to construct webview iframe src')
})
