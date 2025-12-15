import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.webview-provider-missing-create-function'

export const skip = true

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Main }) => {
  // arrange
  await Extension.addWebExtension(new URL(`../fixtures/${name}`, import.meta.url).toString())
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.xyz`, `a`)

  // act
  await Main.openUri(`${tmpDir}/test.xyz`)

  // assert
  // TODO improve error message
  const error = Locator('.Error')
  await expect(error).toBeVisible()
  await expect(error).toHaveText('Error: provider.create is not a function')
}
