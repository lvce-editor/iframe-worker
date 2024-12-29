import { beforeEach, expect, jest, test } from '@jest/globals'

const SharedProcess = {
  invoke: jest.fn(),
}

jest.unstable_mockModule('../src/parts/SharedProcess/SharedProcess.ts', () => SharedProcess)

const WebViewProtocolRemote = await import('../src/parts/WebViewProtocolRemote/WebViewProtocolRemote.ts')

beforeEach(() => {
  SharedProcess.invoke.mockReset()
})

test('register', async () => {
  const previewServerId = 1
  const port = '3000'
  const root = '/test/root'
  const frameAncestors = ''
  const csp = ''
  const webViewId = 'test.test'
  const remotePathPrefix = '/remote'
  await WebViewProtocolRemote.register(previewServerId, port, frameAncestors, csp, root, csp, webViewId, remotePathPrefix)
  expect(SharedProcess.invoke).toHaveBeenCalledTimes(3)
  expect(SharedProcess.invoke).toHaveBeenNthCalledWith(1, 'WebViewServer.create', 1)
  expect(SharedProcess.invoke).toHaveBeenNthCalledWith(2, 'WebViewServer.start', 1, '3000')
  expect(SharedProcess.invoke).toHaveBeenNthCalledWith(3, 'WebViewServer.setHandler', 1, '', '', '/test/root', '')
})

test('error case', async () => {
  const previewServerId = 1
  SharedProcess.invoke.mockImplementation(() => Promise.reject(new Error('test error')))
  const port = '3000'
  const root = '/test/root'
  const frameAncestors = ''
  const csp = ''
  const webViewId = 'test.test'
  const remotePathPrefix = '/remote'
  await expect(WebViewProtocolRemote.register(previewServerId, port, frameAncestors, csp, root, csp, webViewId, remotePathPrefix)).rejects.toThrow(
    'test error',
  )
})
