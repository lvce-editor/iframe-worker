import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SetPort from '../src/parts/SetPort/SetPort.ts'

test('setPort', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'WebView.setPort': jest.fn(),
  })
  const uid = 1
  const { port1 } = new MessageChannel()
  const origin = 'http://localhost:3000'
  const portType = ''

  await SetPort.setPort(uid, port1, origin, portType)

  expect(mockRpc.invocations).toEqual([
    ['WebView.compatRendererProcessInvokeAndTransfer', 'WebView.setPort', uid, port1, origin, portType],
  ])
})
