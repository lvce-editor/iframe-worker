import { MessagePortRpcParent, type Rpc } from '@lvce-editor/rpc'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const createWebViewConnection = async (uid: number, origin: string): Promise<Rpc> => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const rpcPromise = MessagePortRpcParent.create({
    commandMap: {},
    isMessagePortOpen: false,
    messagePort: port2,
  })
  const portType = 'test'
  await RendererWorker.invokeAndTransfer('WebView.setPort', uid, port1, origin, portType)
  // TODO dispose rpc to avoid memory leak
  const rpc = await rpcPromise
  return rpc
}
f
