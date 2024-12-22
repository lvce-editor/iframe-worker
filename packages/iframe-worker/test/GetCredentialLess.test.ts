import { expect, test } from '@jest/globals'
import * as GetCredentialLess from '../src/parts/GetCredentialLess/GetCredentialLess.ts'

test('localhost - returns false', () => {
  const locationHost = 'localhost:3000'
  expect(GetCredentialLess.getCredentialLess(locationHost)).toBe(false)
})

test('non-localhost - returns true', () => {
  const locationHost = 'example.com'
  expect(GetCredentialLess.getCredentialLess(locationHost)).toBe(true)
})
