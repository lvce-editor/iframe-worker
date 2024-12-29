import { expect, test } from '@jest/globals'
import * as GetWebViewId from '../src/parts/GetWebViewId/GetWebViewId.ts'

test('webview protocol - extracts id from uri', () => {
  const webViews: any[] = []
  const uri = 'webview://test-id'
  expect(GetWebViewId.getWebViewId(webViews, uri)).toBe('test-id')
})

test('matches selector at end of uri', () => {
  const webViews = [
    {
      id: 'test-webview-1',
      selector: ['markdown.preview'],
    },
  ]
  const uri = 'file:///path/to/markdown.preview'
  expect(GetWebViewId.getWebViewId(webViews, uri)).toBe('test-webview-1')
})

test('no matching selector', () => {
  const webViews = [
    {
      id: 'test-webview-1',
      selector: ['markdown.preview'],
    },
  ]
  const uri = 'file:///path/to/something.else'
  expect(GetWebViewId.getWebViewId(webViews, uri)).toBe('')
})

test('empty webViews array', () => {
  const webViews: any[] = []
  const uri = 'file:///path/to/file'
  expect(GetWebViewId.getWebViewId(webViews, uri)).toBe('')
})

test('webView without selector', () => {
  const webViews = [
    {
      id: 'test-webview-1',
    },
  ]
  const uri = 'file:///path/to/file'
  expect(GetWebViewId.getWebViewId(webViews, uri)).toBe('')
})
