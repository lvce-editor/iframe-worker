import { expect, test } from '@jest/globals'
import * as GetWebViewProtocolModule from '../src/parts/GetWebViewProtocolModule/GetWebViewProtocolModule.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('electron platform', () => {
  expect(GetWebViewProtocolModule.getModule(PlatformType.Electron)).toBe('lvce-oss-webview')
})

test('web platform', () => {
  expect(GetWebViewProtocolModule.getModule(PlatformType.Web)).toBe('http')
})

test('remote platform', () => {
  expect(GetWebViewProtocolModule.getModule(PlatformType.Remote)).toBe('http')
})

test('test platform', () => {
  expect(GetWebViewProtocolModule.getModule(PlatformType.Test)).toBe('http')
})
