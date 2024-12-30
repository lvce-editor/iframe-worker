import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as GetWebViewRpc from '../GetWebViewRpc/GetWebViewRpc.ts'

export const createWebViewRpc = async (webView: any, savedState: any, uri: string, portId: number): Promise<any> => {
  if (!webView || !webView.rpc || typeof webView.rpc !== 'string') {
    return
  }
  const rpcInfo = await ExtensionHostWorker.invoke('WebView.getRpcInfo', webView.rpc)
  if (rpcInfo.type !== 'web-worker') {
    throw new Error(`only web worker rpc is supported for webviews`)
  }
  const rpc = await GetWebViewRpc.getWebViewRpc(rpcInfo)
  await rpc.invoke('LoadFile.loadFile', rpcInfo.url)

  // @ts-ignore
  const { port1, port2 } = GetPortTuple.getPortTuple()
  // TODO send port1 to webview
  // TODO send port2 to worker
  await rpc.invokeAndTransfer('_WebView.setPort', portId, port2)
  await rpc.invoke('_WebView.create', { id: portId, savedState, webViewId: webView.id, uri })
}
