import { expect, test } from '@jest/globals'
import * as GetWebViewSandBox from '../src/parts/GetWebViewSandBox/GetWebViewSandBox.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('remote platform', () => {
  const webView = {
    sandbox: ['allow-forms'],
  }
  expect(GetWebViewSandBox.getIframeSandbox(webView, PlatformType.Remote)).toEqual(['allow-scripts', 'allow-same-origin', 'allow-forms'])
})

test('web platform', () => {
  const webView = {
    sandbox: ['allow-forms'],
  }
  expect(GetWebViewSandBox.getIframeSandbox(webView, PlatformType.Web)).toEqual(['allow-scripts', 'allow-forms'])
})

test('electron platform', () => {
  const webView = {
    sandbox: ['allow-forms'],
  }
  expect(GetWebViewSandBox.getIframeSandbox(webView, PlatformType.Electron)).toEqual(['allow-scripts', 'allow-same-origin', 'allow-forms'])
})

test('no sandbox specified', () => {
  const webView = {}
  expect(GetWebViewSandBox.getIframeSandbox(webView, PlatformType.Web)).toEqual(['allow-scripts'])
})
