import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const createWebViewConnection = async (uid: number, origin: string): Promise<Rpc> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      const portType = 'test'
      await RendererWorker.invokeAndTransfer('WebView.setPort', uid, port, origin, portType)
    },
  })
  return rpc
}
