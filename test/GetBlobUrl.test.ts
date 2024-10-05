import { beforeAll, expect, jest, test } from '@jest/globals'
import * as GetBlobUrl from '../src/parts/GetBlobUrl/GetBlobUrl.ts'

beforeAll(() => {
  jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:123456')
})

test('getBlobUrl', () => {
  const content = 'abc'
  const contentType = 'text/plain'
  expect(GetBlobUrl.getBlobUrl(content, contentType)).toBe('blob:123456')
})
