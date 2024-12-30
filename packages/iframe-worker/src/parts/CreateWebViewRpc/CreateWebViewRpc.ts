import { MessagePortRpcParent } from '@lvce-editor/rpc'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as WebViewRpcCommandMap from '../WebViewRpcCommandMap/WebViewRpcCommandMap.ts'

export const createWebViewRpc = async (webView: any, savedState: any, uri: string, portId: number): Promise<any> => {
  if (!webView || !webView.rpc || typeof webView.rpc !== 'string') {
    return
  }
  const rpcInfo = await ExtensionHostWorker.invoke('WebView.getRpcInfo', webView.rpc)
  if (rpcInfo.type !== 'web-worker') {
    throw new Error(`only web worker rpc is supported for webviews`)
  }
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const rpcPromise = MessagePortRpcParent.create({
    commandMap: WebViewRpcCommandMap.commandMap,
    messagePort: port2,
    isMessagePortOpen: true,
  })
  await ExtensionHostWorker.invokeAndTransfer('WebView.createWebViewWorkerRpc', rpcInfo, port1)
  const rpc = await rpcPromise
  // TODO rpc module should start the port
  port2.start()
  await rpc.invoke('LoadFile.loadFile', rpcInfo.url)

  await rpc.invoke('WebView.create', { id: portId, savedState, webViewId: webView.id, uri })
}
