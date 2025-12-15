import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.webview-provider-not-found'

export const skip = 1

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  await Extension.addWebExtension(new URL(`../fixtures/${name}`, import.meta.url).toString())
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.xyz`, `a`)

  // act
  await Main.openUri(`${tmpDir}/test.xyz`)

  // assert
  const error = Locator('.Error')
  await expect(error).toBeVisible()
  await expect(error).toHaveText('Error: webview provider xyz not found')
}
