import { beforeEach, expect, jest, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

const CreateWebWorkerRpc2 = {
  createWebWorkerRpc2: jest.fn(),
}

const CreateWebWorkerRpcLegacy = {
  createWebViewRpc: jest.fn(),
}

jest.unstable_mockModule('../src/parts/CreateWebWorkerRpc2/CreateWebWorkerRpc2.ts', () => CreateWebWorkerRpc2)
jest.unstable_mockModule('../src/parts/CreateWebWorkerRpcLegacy/CreateWebWorkerRpcLegacy.ts', () => CreateWebWorkerRpcLegacy)

const { createWebViewRpc } = await import('../src/parts/CreateWebViewRpc/CreateWebViewRpc.ts')

beforeEach(() => {
  jest.resetAllMocks()
})

test('does nothing when the webview has no modern rpc id', async () => {
  using managementRpc = ExtensionManagementWorker.registerMockRpc({})

  await createWebViewRpc({}, {}, 'test://uri', 1, 2, '*')

  expect(managementRpc.invocations).toEqual([])
})

test('gets rpc info from extension management', async () => {
  const rpcInfo = { type: 'web-worker-2', url: './worker.js' }
  using managementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getRpcInfo': () => rpcInfo,
  })

  await createWebViewRpc({ rpc: 'test.rpc' }, {}, 'test://uri', 1, 2, '*')

  expect(managementRpc.invocations).toEqual([['Extensions.getRpcInfo', 'test.rpc']])
  expect(CreateWebWorkerRpc2.createWebWorkerRpc2).toHaveBeenCalledWith(rpcInfo, { rpc: 'test.rpc' }, {}, 'test://uri', 1, 2, '*')
})
