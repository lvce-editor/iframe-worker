import { beforeEach, expect, jest, test } from '@jest/globals'
import * as Rpc from '../src/parts/Rpc/Rpc.ts'
import * as SetPort from '../src/parts/SetPort/SetPort.ts'

const mockRpc = {
  invokeAndTransfer: jest.fn(),
}

beforeEach(async () => {
  Rpc.setRpc(mockRpc)
})

test('setPort', async () => {
  const uid = 1
  const { port1 } = new MessageChannel()
  const origin = 'http://localhost:3000'
  const portType = ''

  await SetPort.setPort(uid, port1, origin, portType)

  expect(mockRpc.invokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(mockRpc.invokeAndTransfer).toHaveBeenCalledWith(
    'WebView.compatRendererProcessInvokeAndTransfer',
    'WebView.setPort',
    uid,
    port1,
    origin,
    portType,
  )
})
