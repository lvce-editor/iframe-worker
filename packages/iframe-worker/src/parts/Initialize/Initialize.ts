import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionHost, RendererWorker } from '@lvce-editor/rpc-registry'

export const initialize = async (): Promise<void> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToExtensionHostWorker(port, 0)
    },
  })
  ExtensionHost.set(rpc)
}
