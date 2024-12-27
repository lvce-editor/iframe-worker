import { expect, test } from '@jest/globals'
import * as GetWebViewPermissionPolicy from '../src/parts/GetWebViewPermissionPolicy/GetWebViewPermissionPolicy.ts'

test('default permission policy', () => {
  const webView = {}
  expect(GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)).toEqual(['cross-origin-isolated'])
})

test('custom permission policy', () => {
  const webView = {
    allow: ['camera=(self)', 'microphone=(self)'],
  }
  expect(GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)).toEqual(['cross-origin-isolated', 'camera=(self)', 'microphone=(self)'])
})

test('empty allow array', () => {
  const webView = {
    allow: [],
  }
  expect(GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)).toEqual(['cross-origin-isolated'])
})

test('null allow value', () => {
  const webView = {
    allow: null,
  }
  expect(GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)).toEqual(['cross-origin-isolated'])
})
