import { beforeEach, expect, jest, test } from '@jest/globals'
import * as SetPort from '../src/parts/SetPort/SetPort.ts'

const RendererProcess = {
  invokeAndTransfer: jest.fn(),
}

jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.ts', () => RendererProcess)

beforeEach(async () => {
  RendererProcess.invokeAndTransfer.mockReset()
})

test('setPort', async () => {
  const uid = 1
  const port = new MessagePort()
  const origin = 'http://localhost:3000'
  const portType = ''

  await SetPort.setPort(uid, port, origin, portType)

  expect(RendererProcess.invokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(RendererProcess.invokeAndTransfer).toHaveBeenCalledWith('WebView.setPort', uid, port, origin, portType)
})
