import { beforeAll, expect, test } from '@jest/globals'
import * as Location from '../src/parts/Location/Location.ts'

beforeAll(() => {
  // @ts-ignore
  globalThis.location = {
    host: 'example.com',
    origin: 'https://example.com',
    port: '443',
    protocol: 'https:',
  }
})

test('getOrigin', () => {
  expect(Location.getOrigin()).toBe('https://example.com')
})

test('getHost', () => {
  expect(Location.getHost()).toBe('example.com')
})

test('getProtocol', () => {
  expect(Location.getProtocol()).toBe('https:')
})

test('getPort', () => {
  expect(Location.getPort()).toBe('443')
})

test('getPort - empty port', () => {
  // @ts-ignore
  globalThis.location.port = ''
  expect(Location.getPort()).toBe('')
  // @ts-ignore
  globalThis.location.port = '443' // restore original value
})

test('getHost - with port', () => {
  // @ts-ignore
  globalThis.location.host = 'example.com:8080'
  expect(Location.getHost()).toBe('example.com:8080')
  // @ts-ignore
  globalThis.location.host = 'example.com' // restore original value
})

test('getProtocol - http', () => {
  // @ts-ignore
  globalThis.location.protocol = 'http:'
  expect(Location.getProtocol()).toBe('http:')
  // @ts-ignore
  globalThis.location.protocol = 'https:' // restore original value
})
