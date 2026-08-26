import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/SavedWebViewState/SavedWebViewState.ts', () => {
  return {
    getSavedState: jest.fn(),
  }
})

const GetSavedWebViewState = await import('../src/parts/GetSavedWebViewState/GetSavedWebViewState.ts')
const SavedWebViewState = await import('../src/parts/SavedWebViewState/SavedWebViewState.ts')

test('no states', async () => {
  expect(await GetSavedWebViewState.getSavedWebViewState('test-id')).toBe(undefined)
})

test('states is not an array', async () => {
  jest.spyOn(SavedWebViewState, 'getSavedState').mockResolvedValue({})
  expect(await GetSavedWebViewState.getSavedWebViewState('test-id')).toBe(undefined)
})

test('state found', async () => {
  const mockState = {
    value: 123,
  }
  jest.spyOn(SavedWebViewState, 'getSavedState').mockResolvedValue([
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
  jest.spyOn(SavedWebViewState, 'getSavedState').mockResolvedValue([
    {
      key: 'different-id',
      value: {
        state: {},
      },
    },
  ])
  expect(await GetSavedWebViewState.getSavedWebViewState('test-id')).toBe(undefined)
})
