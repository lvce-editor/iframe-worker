import { expect, test } from '@jest/globals'
import * as GetWebViewFrameAncestors from '../src/parts/GetWebViewFrameAncestors/GetWebViewFrameAncestors.ts'

test('http protocol', () => {
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  expect(GetWebViewFrameAncestors.getWebViewFrameAncestors(locationProtocol, locationHost)).toBe('http://localhost:3000')
})

test('https protocol', () => {
  const locationProtocol = 'https:'
  const locationHost = 'example.com'
  expect(GetWebViewFrameAncestors.getWebViewFrameAncestors(locationProtocol, locationHost)).toBe('https://example.com')
})

test('gitpod host', () => {
  const locationProtocol = 'https:'
  const locationHost = '3000-user-workspace.gitpod.io'
  expect(GetWebViewFrameAncestors.getWebViewFrameAncestors(locationProtocol, locationHost)).toBe('https://3000-user-workspace.gitpod.io')
})
