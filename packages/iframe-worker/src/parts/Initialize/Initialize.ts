import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const initialize = async (): Promise<void> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RpcRegistry.RendererWorker.sendMessagePortToExtensionHostWorker(port, 0)
    },
  })
  RpcRegistry.ExtensionHost.set(rpc)
}
