import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize connects only to extension management', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker'() {},
  })

  await initialize(1)

  expect(rendererRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker', expect.anything(), 'Extensions.handleMessagePort', 0],
  ])
  await ExtensionManagementWorker.dispose()
})
