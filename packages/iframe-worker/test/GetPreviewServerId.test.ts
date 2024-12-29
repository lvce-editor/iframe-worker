import { expect, test } from '@jest/globals'
import * as GetPreviewServerId from '../src/parts/GetPreviewServerId/GetPreviewServerId.ts'

test('getPreviewServerId - returns 1', () => {
  expect(GetPreviewServerId.getPreviewServerId()).toBe(1)
})

test('getPreviewServerId - returns number type', () => {
  expect(typeof GetPreviewServerId.getPreviewServerId()).toBe('number')
})

test('getPreviewServerId - returns consistent value', () => {
  const firstCall = GetPreviewServerId.getPreviewServerId()
  const secondCall = GetPreviewServerId.getPreviewServerId()
  expect(firstCall).toBe(secondCall)
})
