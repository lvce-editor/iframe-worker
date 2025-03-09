import { expect, test } from '@jest/globals'
import * as GetProtocol from '../src/parts/GetProtocol/GetProtocol.ts'

test('http protocol', () => {
  const uri = 'http://example.com'
  expect(GetProtocol.getProtocol(uri)).toBe('http')
})

test('https protocol', () => {
  const uri = 'https://example.com'
  expect(GetProtocol.getProtocol(uri)).toBe('https')
})

test('file protocol', () => {
  const uri = 'file:///path/to/file'
  expect(GetProtocol.getProtocol(uri)).toBe('file')
})

test('webview protocol', () => {
  const uri = 'webview://test-id'
  expect(GetProtocol.getProtocol(uri)).toBe('webview')
})

test('no protocol', () => {
  const uri = 'example.com'
  expect(GetProtocol.getProtocol(uri)).toBe('')
})

test('empty string', () => {
  const uri = ''
  expect(GetProtocol.getProtocol(uri)).toBe('')
})
