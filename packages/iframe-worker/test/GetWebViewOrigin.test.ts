import { expect, test } from '@jest/globals'
import * as GetWebViewOrigin from '../src/parts/GetWebViewOrigin/GetWebViewOrigin.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

const webViewScheme = 'lvce-oss-webview'
const webViewId = 'test'

test('electron platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Electron, webViewScheme, webViewId)).toBe('lvce-oss-webview://test')
})

test('remote platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Remote, webViewScheme, webViewId)).toBe('http://localhost:3000')
})

test('web platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Web, webViewScheme, webViewId)).toBe('*')
})

test('platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Test, webViewScheme, webViewId)).toBe('*')
})
