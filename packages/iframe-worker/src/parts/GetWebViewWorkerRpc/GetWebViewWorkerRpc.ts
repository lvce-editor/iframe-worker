import { MessagePortRpcParent, type Rpc } from '@lvce-editor/rpc'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as WebViewRpcCommandMap from '../WebViewRpcCommandMap/WebViewRpcCommandMap.ts'

/**
 * @deprecated use getWebViewWorkerRpc2 instead
 */
export const getWebViewWorkerRpc = async (rpcInfo: any): Promise<Rpc> => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const rpcPromise = MessagePortRpcParent.create({
    commandMap: WebViewRpcCommandMap.commandMap,
    isMessagePortOpen: true,
    messagePort: port2,
  })
  await ExtensionHostWorker.invokeAndTransfer('WebView.createWebViewWorkerRpc', rpcInfo, port1)
  const rpc = await rpcPromise
  // TODO rpc module should start the port
  port2.start()
  return rpc
}
