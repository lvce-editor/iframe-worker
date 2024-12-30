import { MessagePortRpcParent } from '@lvce-editor/rpc'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'

export const createWebViewRpc = async (webView: any): Promise<any> => {
  if (!webView || !webView.rpc || typeof webView.rpc !== 'string') {
    return
  }
  const rpcInfo = await ExtensionHostWorker.invoke('WebView.getRpcInfo', webView.rpc)
  if (rpcInfo.type !== 'web-worker') {
    throw new Error(`only web worker rpc is supported for webviews`)
  }
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const rpcPromise = MessagePortRpcParent.create({
    commandMap: {},
    messagePort: port2,
    isMessagePortOpen: true,
  })
  await ExtensionHostWorker.invokeAndTransfer('WebView.createWebViewWorkerRpc', rpcInfo, port1)
  const rpc = await rpcPromise
  // TODO rpc module should start the port
  port2.start()
  await rpc.invoke('LoadFile.loadFile', rpcInfo.url)
  console.log('did load file')
}
