import { expect, test } from '@jest/globals'
import * as GetWebViewPermissionPolicy from '../src/parts/GetWebViewPermissionPolicy/GetWebViewPermissionPolicy.ts'

test('default permission policy', () => {
  const webView = {}
  expect(GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)).toBe(
    'accelerometer=(), ambient-light-sensor=(), battery=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), gamepad=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()',
  )
})

test('custom permission policy', () => {
  const webView = {
    permissionPolicy: ['camera=(self)', 'microphone=(self)'],
  }
  expect(GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)).toBe('camera=(self), microphone=(self)')
})
