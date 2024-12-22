import { expect, test } from '@jest/globals'
import * as AddSemiColon from '../src/parts/AddSemiColon/AddSemiColon.ts'

test('Backslash', () => {
  const line = 'abc'
  expect(AddSemiColon.addSemicolon(line)).toBe('abc;')
})
