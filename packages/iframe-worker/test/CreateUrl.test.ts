import { expect, test } from '@jest/globals'
import * as CreateUrl from '../src/parts/CreateUrl/CreateUrl.ts'

test('createUrl', () => {
  const protocol = 'https:'
  const host = 'example.com'
  expect(CreateUrl.createUrl(protocol, host)).toBe('https://example.com')
})
