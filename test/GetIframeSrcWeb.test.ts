import { expect, test } from '@jest/globals'
import * as GetIframeSrcWeb from '../src/parts/GetIframeSrcWeb/GetIframeSrcWeb.ts'

test('getIframeSrc', () => {
  const webView = {
    remotePath: '/test/path/index.html',
    path: '/local/path/index.html',
    elements: [
      {
        type: 'script',
        src: '/main.js',
      },
    ],
  }
  const locationOrigin = 'http://localhost:3000'
  const assetDir = ''

  const result = GetIframeSrcWeb.getIframeSrc(webView, locationOrigin, assetDir)
  expect(result).toEqual({
    srcDoc: expect.any(String),
  })
})

test('error case - missing required properties', () => {
  const webView = {}
  const locationOrigin = 'http://localhost:3000'
  const assetDir = ''

  expect(() => GetIframeSrcWeb.getIframeSrc(webView, locationOrigin, assetDir)).toThrow()
})
