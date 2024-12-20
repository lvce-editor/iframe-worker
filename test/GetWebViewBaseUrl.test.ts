import { expect, test } from '@jest/globals'
import * as GetWebViewBaseUrl from '../src/parts/GetWebViewBaseUrl/GetWebViewBaseUrl.ts'

const locationOrigin = ''

test('remotePath with index.html', () => {
  const webView = {
    remotePath: '/test/path/index.html',
  }
  expect(GetWebViewBaseUrl.getWebViewBaseUrl(webView, locationOrigin)).toBe('/test/path')
})

test('remotePath without index.html', () => {
  const webView = {
    remotePath: '/test/path',
  }
  expect(GetWebViewBaseUrl.getWebViewBaseUrl(webView, locationOrigin)).toBe('/test/path')
})

test('path with index.html', () => {
  const webView = {
    path: '/local/path/index.html',
  }
  expect(GetWebViewBaseUrl.getWebViewBaseUrl(webView, locationOrigin)).toBe('/local/path')
})

test('path without index.html', () => {
  const webView = {
    path: '/local/path',
  }
  expect(GetWebViewBaseUrl.getWebViewBaseUrl(webView, locationOrigin)).toBe('/local/path')
})
