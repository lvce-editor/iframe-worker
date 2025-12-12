import { expect, test } from '@jest/globals'
import * as GetRemoteUrl from '../src/parts/GetRemoteUrl/GetRemoteUrl.ts'
import * as PlatformState from '../src/parts/PlatformState/PlatformState.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('remote platform - absolute path', async () => {
  PlatformState.setPlatform(PlatformType.Remote)
  const options = {
    id: 1,
    uri: '/test/path',
  }
  const result = await GetRemoteUrl.getRemoteUrl(options)
  expect(result).toBe('/remote/test/path')
})

test('remote platform - relative path', async () => {
  PlatformState.setPlatform(PlatformType.Remote)
  const options = {
    id: 1,
    uri: 'test/path',
  }
  const result = await GetRemoteUrl.getRemoteUrl(options)
  expect(result).toBe('/remote/test/path')
})

test('electron platform - absolute path', async () => {
  PlatformState.setPlatform(PlatformType.Electron)
  const options = {
    id: 1,
    uri: '/test/path',
  }
  const result = await GetRemoteUrl.getRemoteUrl(options)
  expect(result).toBe('/remote/test/path')
})

test('electron platform - relative path', async () => {
  PlatformState.setPlatform(PlatformType.Electron)
  const options = {
    id: 1,
    uri: 'test/path',
  }
  const result = await GetRemoteUrl.getRemoteUrl(options)
  expect(result).toBe('/remote/test/path')
})

test.skip('web platform', async () => {
  PlatformState.setPlatform(PlatformType.Web)
  const options = {
    id: 1,
    uri: 'test/path',
  }
  const result = await GetRemoteUrl.getRemoteUrl(options)
  expect(result).toBe('/remote/test/path')
})

test.skip('uri with protocol', async () => {
  PlatformState.setPlatform(PlatformType.Remote)
  const options = {
    id: 1,
    uri: 'file:///test/path',
  }
  const result = await GetRemoteUrl.getRemoteUrl(options)
  expect(result).toBe('/remote/test/path')
})
