import { expect, test } from '@jest/globals'
import * as GetWebViewPort from '../src/parts/GetWebViewPort/GetWebViewPort.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('web platform - uses location port', () => {
  const locationPort = '8080'
  expect(GetWebViewPort.getWebViewPort(PlatformType.Web, locationPort)).toBe('8080')
})

test('web platform - empty port', () => {
  const locationPort = ''
  expect(GetWebViewPort.getWebViewPort(PlatformType.Web, locationPort)).toBe('')
})

test('electron platform - uses default port', () => {
  const locationPort = '8080'
  expect(GetWebViewPort.getWebViewPort(PlatformType.Electron, locationPort)).toBe('3002')
})

test('remote platform - uses default port', () => {
  const locationPort = '8080'
  expect(GetWebViewPort.getWebViewPort(PlatformType.Remote, locationPort)).toBe('3002')
})

test('test platform - uses default port', () => {
  const locationPort = '8080'
  expect(GetWebViewPort.getWebViewPort(PlatformType.Test, locationPort)).toBe('3002')
})
