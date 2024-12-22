import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/ExtensionHost/ExtensionHostState.ts', () => {
  return {
    getSavedState: jest.fn(),
  }
})

const GetSavedWebViewState = await import('../src/parts/GetSavedWebViewState/GetSavedWebViewState.ts')
const ExtensionHostState = await import('../src/parts/ExtensionHost/ExtensionHostState.ts')

test('no states', async () => {
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
