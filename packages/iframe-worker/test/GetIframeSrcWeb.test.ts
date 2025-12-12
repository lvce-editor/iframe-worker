import { expect, test } from '@jest/globals'
import * as GetIframeSrcWeb from '../src/parts/GetIframeSrcWeb/GetIframeSrcWeb.ts'

test('getIframeSrc', () => {
  const webView = {
    elements: [
      {
        src: '/main.js',
        type: 'script',
      },
    ],
    path: '/local/path/index.html',
    remotePath: '/test/path/index.html',
  }
  const locationOrigin = 'http://localhost:3000'
  const assetDir = ''

  const result = GetIframeSrcWeb.getIframeSrc(webView, locationOrigin, assetDir)
  expect(result).toEqual({
    iframeContent: '',
    iframeSrc: expect.any(String),
    webViewRoot: '',
  })
})

test.skip('error case - missing required properties', () => {
  const webView = {}
  const locationOrigin = 'http://localhost:3000'
  const assetDir = ''
  expect(() => GetIframeSrcWeb.getIframeSrc(webView, locationOrigin, assetDir)).toThrow()
})
