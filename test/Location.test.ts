import { beforeAll, expect, test } from '@jest/globals'
import * as Location from '../src/parts/Location/Location.ts'

beforeAll(() => {
  // @ts-ignore
  globalThis.location = {
    origin: 'https://example.com',
    host: 'example.com',
    protocol: 'https',
  }
})

test('getOrigin', () => {
  expect(Location.getOrigin()).toBe('https://example.com')
})

test('getHost', () => {
  expect(Location.getHost()).toBe('example.com')
})

test('getProtocol', () => {
  expect(Location.getProtocol()).toBe('https')
})
