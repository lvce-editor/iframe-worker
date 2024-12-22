import { expect, test } from '@jest/globals'
import * as GetWebViewOrigin from '../src/parts/GetWebViewOrigin/GetWebViewOrigin.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('electron platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Electron)).toBe('lvce-oss-webview://-/')
})

test('remote platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Remote)).toBe('http://localhost:3000')
})

test('web platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Web)).toBe('*')
})

test('test platform', () => {
  const webViewPort = 3000
  expect(GetWebViewOrigin.getWebViewOrigin(webViewPort, PlatformType.Test)).toBe('*')
})
