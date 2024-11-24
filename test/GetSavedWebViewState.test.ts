import { expect, jest, test } from '@jest/globals'
import * as GetSavedWebViewState from '../src/parts/GetSavedWebViewState/GetSavedWebViewState.ts'
import * as ExtensionHostState from '../src/parts/ExtensionHost/ExtensionHostState.ts'

test('no states', async () => {
  jest.spyOn(ExtensionHostState, 'getSavedState').mockResolvedValue(undefined)
  expect(await GetSavedWebViewState.getSavedWebViewState('test-id')).toBe(undefined)
})

test('states is not an array', async () => {
  jest.spyOn(ExtensionHostState, 'getSavedState').mockResolvedValue({})
  expect(await GetSavedWebViewState.getSavedWebViewState('test-id')).toBe(undefined)
})

test('state found', async () => {
  const mockState = {
    value: 123,
  }
  jest.spyOn(ExtensionHostState, 'getSavedState').mockResolvedValue([
    {
      key: 'test-id',
      value: {
        state: mockState,
      },
    },
  ])
  expect(await GetSavedWebViewState.getSavedWebViewState('test-id')).toBe(mockState)
})

test('state not found', async () => {
  jest.spyOn(ExtensionHostState, 'getSavedState').mockResolvedValue([
    {
      key: 'different-id',
      value: {
        state: {},
      },
    },
  ])
  expect(await GetSavedWebViewState.getSavedWebViewState('test-id')).toBe(undefined)
})
