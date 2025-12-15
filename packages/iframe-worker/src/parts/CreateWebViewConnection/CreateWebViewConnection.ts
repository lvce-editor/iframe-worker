import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

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
