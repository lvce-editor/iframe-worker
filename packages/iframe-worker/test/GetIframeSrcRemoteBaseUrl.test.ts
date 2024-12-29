import { expect, test } from '@jest/globals'
import * as GetIframeSrcRemoteBaseUrl from '../src/parts/GetIframeSrcRemoteBaseUrl/GetIframeSrcRemoteBaseUrl.ts'

test('same origin http url', () => {
  const webViewRoot = 'http://localhost:3000/test'
  const locationOrigin = 'http://localhost:3000'
  expect(GetIframeSrcRemoteBaseUrl.getIframeSrcRemoteBaseUrl(webViewRoot, locationOrigin)).toBe('/test')
})

test('same origin https url', () => {
  const webViewRoot = 'https://example.com/path'
  const locationOrigin = 'https://example.com'
  expect(GetIframeSrcRemoteBaseUrl.getIframeSrcRemoteBaseUrl(webViewRoot, locationOrigin)).toBe('/path')
})

test('different origin http url', () => {
  const webViewRoot = 'http://other-domain.com/test'
  const locationOrigin = 'http://localhost:3000'
  expect(GetIframeSrcRemoteBaseUrl.getIframeSrcRemoteBaseUrl(webViewRoot, locationOrigin)).toBe('http://other-domain.com/test')
})

test('relative path', () => {
  const webViewRoot = '/some/path'
  const locationOrigin = 'http://localhost:3000'
  expect(GetIframeSrcRemoteBaseUrl.getIframeSrcRemoteBaseUrl(webViewRoot, locationOrigin)).toBe('')
})

test('empty path', () => {
  const webViewRoot = ''
  const locationOrigin = 'http://localhost:3000'
  expect(GetIframeSrcRemoteBaseUrl.getIframeSrcRemoteBaseUrl(webViewRoot, locationOrigin)).toBe('')
})
