import { expect, test } from '@jest/globals'
import * as GetWebViewOrigin from '../src/parts/GetWebViewOrigin/GetWebViewOrigin.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

const webViewScheme = 'lvce-oss-webview'

test('electron platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Electron, webViewScheme)).toBe('lvce-oss-webview://-/')
})

test('remote platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Remote, webViewScheme)).toBe('http://localhost:3000')
})

test('web platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Web, webViewScheme)).toBe('*')
})

test('test platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Test, webViewScheme)).toBe('*')
})
