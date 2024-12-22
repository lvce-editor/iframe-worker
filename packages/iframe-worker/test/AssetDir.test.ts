import { beforeEach, expect, jest, test } from '@jest/globals'

const Platform = {
  platform: 2, // Electron platform by default
}

jest.unstable_mockModule('../src/parts/Platform/Platform.ts', () => Platform)

beforeEach(() => {
  jest.resetModules()
  // @ts-ignore
  delete globalThis.ASSET_DIR
})

test('getAssetDir - when ASSET_DIR is defined', async () => {
  // @ts-ignore
  globalThis.ASSET_DIR = '/test/assets'
  const { assetDir } = await import('../src/parts/AssetDir/AssetDir.ts')
  expect(assetDir).toBe('/test/assets')
})

test('getAssetDir - when platform is Electron', async () => {
  Platform.platform = 2 // PlatformType.Electron
  const { assetDir } = await import('../src/parts/AssetDir/AssetDir.ts')
  expect(assetDir).toBe('')
})

test('getAssetDir - default case', async () => {
  Platform.platform = 1 // PlatformType.Web
  const { assetDir } = await import('../src/parts/AssetDir/AssetDir.ts')
  expect(assetDir).toBe('')
})
