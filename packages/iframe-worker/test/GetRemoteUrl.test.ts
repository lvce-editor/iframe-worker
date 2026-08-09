import { beforeEach, expect, test } from '@jest/globals'
import { RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import * as GetRemoteUrl from '../src/parts/GetRemoteUrl/GetRemoteUrl.ts'
import * as PlatformState from '../src/parts/PlatformState/PlatformState.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

beforeEach(() => {
  RpcRegistry.remove(RpcId.RendererWorker)
  RendererWorker.registerMockRpc({
    'FileSystem.exists': async () => true,
  })
})

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

test('web platform - file uri with spaces', async () => {
  PlatformState.setPlatform(PlatformType.Web)
  const options = {
    id: 1,
    uri: 'file:///test/video preview.mp4',
  }
  const result = await GetRemoteUrl.getRemoteUrl(options)
  expect(result).toBe('/remote/test/video%20preview.mp4')
})

test('already encoded file uri', async () => {
  PlatformState.setPlatform(PlatformType.Remote)
  const options = {
    id: 1,
    uri: 'file:///test/video%20preview.mp4',
  }
  const result = await GetRemoteUrl.getRemoteUrl(options)
  expect(result).toBe('/remote/test/video%20preview.mp4')
})

test('missing file', async () => {
  RpcRegistry.remove(RpcId.RendererWorker)
  RendererWorker.registerMockRpc({
    'FileSystem.exists': async () => false,
  })
  PlatformState.setPlatform(PlatformType.Web)
  const options = {
    id: 1,
    uri: 'file:///test/missing video.mp4',
  }

  await expect(GetRemoteUrl.getRemoteUrl(options)).rejects.toThrow('File not found: /test/missing video.mp4')
})
