import { expect, test } from '@jest/globals'
import * as CreateLocalHostUrl from '../src/parts/CreateLocalHostUrl/CreateLocalHostUrl.ts'

test('gitpod', () => {
  const locationProtocol = 'https:'
  const locationHost = '3000.gitpod.io'
  const isGitpod = true
  const webViewPort = '3001'
  const useNewWebViewHandler = false
  const webViewId = ''
  expect(CreateLocalHostUrl.createLocalHostUrl(locationProtocol, locationHost, isGitpod, webViewPort, webViewId, useNewWebViewHandler)).toBe(
    'https://3001.gitpod.io',
  )
})

test('localhost', () => {
  const locationProtocol = 'http:'
  const locationHost = 'localhost:3000'
  const isGitpod = false
  const webViewPort = '3001'
  const useNewWebViewHandler = false
  const webViewId = ''
  expect(CreateLocalHostUrl.createLocalHostUrl(locationProtocol, locationHost, isGitpod, webViewPort, webViewId, useNewWebViewHandler)).toBe(
    'http://localhost:3001',
  )
})
