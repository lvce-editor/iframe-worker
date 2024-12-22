import { expect, test } from '@jest/globals'
import * as GetWebViewTitle from '../src/parts/GetWebViewTitle/GetWebViewTitle.ts'

test('getWebViewTitle - with valid title element', () => {
  const webView = {
    elements: [
      {
        type: 'title',
        value: 'Test Title',
      },
    ],
  }
  expect(GetWebViewTitle.getWebViewTitle(webView)).toBe('Test Title')
})

test('getWebViewTitle - with multiple elements', () => {
  const webView = {
    elements: [
      {
        type: 'script',
        value: 'script.js',
      },
      {
        type: 'title',
        value: 'Test Title',
      },
    ],
  }
  expect(GetWebViewTitle.getWebViewTitle(webView)).toBe('Test Title')
})

test('getWebViewTitle - without title element', () => {
  const webView = {
    elements: [
      {
        type: 'script',
        value: 'script.js',
      },
    ],
  }
  expect(GetWebViewTitle.getWebViewTitle(webView)).toBe('WebView')
})

test('getWebViewTitle - with empty elements array', () => {
  const webView = {
    elements: [],
  }
  expect(GetWebViewTitle.getWebViewTitle(webView)).toBe('WebView')
})

test('getWebViewTitle - with undefined webView', () => {
  expect(GetWebViewTitle.getWebViewTitle(undefined)).toBe('WebView')
})

test('getWebViewTitle - with null elements', () => {
  const webView = {
    elements: null,
  }
  expect(GetWebViewTitle.getWebViewTitle(webView)).toBe('WebView')
})

test('getWebViewTitle - with invalid title value type', () => {
  const webView = {
    elements: [
      {
        type: 'title',
        value: 123,
      },
    ],
  }
  expect(GetWebViewTitle.getWebViewTitle(webView)).toBe('WebView')
})
