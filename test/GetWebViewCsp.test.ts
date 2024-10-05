import { expect, test } from '@jest/globals'
import * as GetWebViewCsp from '../src/parts/GetWebViewCsp/GetWebViewCsp.ts'

test('default', () => {
  const webView = {}
  expect(GetWebViewCsp.getWebViewCsp(webView)).toBe("default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; media-src 'self';")
})

test('webview csp', () => {
  const webView = {
    contentSecurityPolicy: [`default-src 'none'`],
  }
  expect(GetWebViewCsp.getWebViewCsp(webView)).toBe("default-src 'none';")
})
