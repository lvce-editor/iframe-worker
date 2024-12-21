import { expect, test } from '@jest/globals'
import * as GetWebViewProtocolModule from '../src/parts/GetWebViewProtocolModule/GetWebViewProtocolModule.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as WebViewProtocolElectron from '../src/parts/WebViewProtocolElectron/WebViewProtocolElectron.ts'
import * as WebViewProtocolRemote from '../src/parts/WebViewProtocolRemote/WebViewProtocolRemote.ts'
import * as WebViewProtocolWeb from '../src/parts/WebViewProtocolWeb/WebViewProtocolWeb.ts'

test('electron platform', () => {
  expect(GetWebViewProtocolModule.getModule(PlatformType.Electron)).toBe(WebViewProtocolElectron.register)
})

test('web platform', () => {
  expect(GetWebViewProtocolModule.getModule(PlatformType.Web)).toBe(WebViewProtocolWeb.register)
})

test('remote platform', () => {
  expect(GetWebViewProtocolModule.getModule(PlatformType.Remote)).toBe(WebViewProtocolRemote.register)
})

test('test platform', () => {
  expect(GetWebViewProtocolModule.getModule(PlatformType.Test)).toBe(WebViewProtocolWeb.register)
})
