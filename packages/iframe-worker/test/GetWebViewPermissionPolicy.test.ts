import { expect, test } from '@jest/globals'
import * as GetWebViewPermissionPolicy from '../src/parts/GetWebViewPermissionPolicy/GetWebViewPermissionPolicy.ts'

test('default permission policy', () => {
  const webView = {}
  expect(GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)).toEqual([])
})

test('custom permission policy', () => {
  const webView = {
    allow: ['camera=(self)', 'microphone=(self)'],
  }
  expect(GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)).toEqual(['camera=(self)', 'microphone=(self)'])
})
