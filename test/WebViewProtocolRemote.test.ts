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
  const protocol = 'test-protocol'
  const hostname = 'localhost'
  const port = '3000'
  const root = '/test/root'
  const isGitpod = false
  const assetDir = ''
  const frameAncestors = ''
  const csp = ''
  await WebViewProtocolRemote.register(previewServerId, port, frameAncestors, csp, root, csp)
  expect(SharedProcess.invoke).toHaveBeenCalledWith('WebViewServer.registerProtocol', protocol, hostname, port, root, isGitpod, assetDir)
})

test('error case', async () => {
  const previewServerId = 1
  SharedProcess.invoke.mockImplementation(() => Promise.reject(new Error('test error')))
  const port = '3000'
  const root = '/test/root'
  const frameAncestors = ''
  const csp = ''
  await expect(WebViewProtocolRemote.register(previewServerId, port, frameAncestors, csp, root, csp)).rejects.toThrow('test error')
})
