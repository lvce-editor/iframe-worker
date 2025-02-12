import type { WebView } from '../WebView/WebView.ts'
import * as CreateSecondaryWebViewConnection from '../CreateSecondaryWebViewConnection/CreateSecondaryWebViewConnection.ts'
import * as CreateWebViewConnection from '../CreateWebViewConnection/CreateWebViewConnection.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as GetWebViewWorkerRpc from '../GetWebViewWorkerRpc/GetWebViewWorkerRpc.ts'
import * as RpcState from '../RpcState/RpcState.ts'

export const createWebViewRpc = async (
  rpcInfo: any,
  webView: any,
  savedState: any,
  uri: string,
  portId: number,
  webViewUid: number,
  origin: string,
): Promise<any> => {
  // deprecated below
  const rpc = await GetWebViewWorkerRpc.getWebViewWorkerRpc(rpcInfo)
  const webViewInfo: WebView = {
    rpc,
    webViewId: webView.id,
    portId: portId,
    webViewUid,
    origin,
  }
  RpcState.set(portId, webViewInfo)
  await rpc.invoke('LoadFile.loadFile', rpcInfo.url)

  // TODO this connection might not be needed
  await CreateWebViewConnection.createWebViewConnection(webViewUid, origin)

  const { port1, port2 } = GetPortTuple.getPortTuple()
  await CreateSecondaryWebViewConnection.createSecondaryWebViewConnection(webViewUid, origin, port1)
  await rpc.invokeAndTransfer('_WebView.setPort', portId, port2)
  await rpc.invoke('_WebView.create', { id: portId, savedState, webViewId: webView.id, uri })
}
