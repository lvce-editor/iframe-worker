import { expect, test } from '@jest/globals'
import * as GetWebViewHtml from '../src/parts/GetWebViewHtml/GetWebViewHtml.ts'

test('empty elements', () => {
  const baseUrl = ''
  const locationOrigin = 'http://localhost:3000'
  const elements: readonly any[] = []
  const assetDir = ''
  expect(GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, elements, assetDir)).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
</html>
`)
})

test('script element', () => {
  const baseUrl = '/test'
  const locationOrigin = 'http://localhost:3000'
  const elements: readonly any[] = [
    {
      type: 'script',
      src: '/main.js',
    },
  ]
  const assetDir = ''
  expect(GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, elements, assetDir)).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script type="module" src="http://localhost:3000/js/preview-injected.js"></script>
    <script type="module" src="http://localhost:3000/test/undefined"></script>
  </head>
</html>
`)
})

test('style element', () => {
  const baseUrl = '/test'
  const locationOrigin = 'http://localhost:3000'
  const elements: readonly any[] = [
    {
      type: 'style',
      href: '/styles.css',
    },
  ]
  const assetDir = ''
  expect(GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, elements, assetDir)).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
</html>
`)
})

test('title element', () => {
  const baseUrl = '/test'
  const locationOrigin = 'http://localhost:3000'
  const elements: readonly any[] = [
    {
      type: 'title',
      value: 'test',
    },
  ]
  const assetDir = ''
  expect(GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, elements, assetDir)).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>test</title>
  </head>
</html>
`)
})

test('multiple elements', () => {
  const baseUrl = '/test'
  const locationOrigin = 'http://localhost:3000'
  const elements: readonly any[] = [
    {
      type: 'script',
      src: '/main.js',
    },
    {
      type: 'css',
      path: '/styles.css',
    },
  ]
  const assetDir = ''
  expect(GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, elements, assetDir)).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script type="module" src="http://localhost:3000/js/preview-injected.js"></script>
    <script type="module" src="http://localhost:3000/test/undefined"></script>
    <link rel="stylesheet" href="http://localhost:3000/test//styles.css" />
  </head>
</html>
`)
})

test('unknown element type', () => {
  const baseUrl = '/test'
  const locationOrigin = 'http://localhost:3000'
  const elements: readonly any[] = [
    {
      type: 'unknown',
      src: '/file.txt',
    },
  ]
  const assetDir = ''
  expect(GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, elements, assetDir)).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
</html>
`)
})

test('no elements', () => {
  const baseUrl = '/test'
  const locationOrigin = 'http://localhost:3000'
  const elements: any = undefined
  const assetDir = ''
  expect(GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, elements, assetDir)).toBe('')
})
