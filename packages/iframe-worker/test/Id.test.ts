import { expect, test } from '@jest/globals'
import * as Id from '../src/parts/Id/Id.ts'

test('create - returns incrementing numbers', () => {
  expect(Id.create()).toBe(1)
  expect(Id.create()).toBe(2)
  expect(Id.create()).toBe(3)
})
