import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionHost as ExtensionHostWorker } from '@lvce-editor/rpc-registry'
import * as WebViewRpcCommandMap from '../WebViewRpcCommandMap/WebViewRpcCommandMap.ts'

export const getWebViewWorkerRpc2 = async (rpcInfo: any): Promise<Rpc> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: WebViewRpcCommandMap.commandMap,
    async send(port) {
      await ExtensionHostWorker.invokeAndTransfer('WebView.createWebViewWorkerRpc2', rpcInfo, port)
    },
  })
  // TODO
  // 1. ask extension host worker to ask renderer worker to ask renderer process to create a worker with given url
  // 2. send the port through renderer worker to renderer process to the worker for a direct connection
  // TODO rpc module should start the port
  return rpc
}

// TODO not part of this function but, for the webview webworker connection,
// send two ports to the iframe
// one port for builtin events like ctrl+shift+p keydown event for quickpick
// second port for the webview webworker connection

// this creates in total
// 1 iframe
// 1 worker
// 6 messageports

// one way to reduce the number of messageports could be to route the worker events
// through the iframe worker. However that could introduce some overhead / latency
// compared to direct connections
