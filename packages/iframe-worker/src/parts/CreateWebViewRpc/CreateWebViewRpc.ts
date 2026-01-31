import { ExtensionHost as ExtensionHostWorker } from '@lvce-editor/rpc-registry'
import * as CreateWebWorkerRpc2 from '../CreateWebWorkerRpc2/CreateWebWorkerRpc2.ts'
import * as CreateWebWorkerRpcLegacy from '../CreateWebWorkerRpcLegacy/CreateWebWorkerRpcLegacy.ts'

export const createWebViewRpc = async (
  webView: any,
  savedState: any,
  uri: string,
  portId: number,
  webViewUid: number,
  origin: string,
): Promise<any> => {
  if (!webView || !webView.rpc || typeof webView.rpc !== 'string') {
    return
  }
  const rpcInfo = await ExtensionHostWorker.invoke('WebView.getRpcInfo', webView.rpc)
  console.log({ rpcInfo })
  if (rpcInfo && rpcInfo.type === 'web-worker-2') {
    return CreateWebWorkerRpc2.createWebWorkerRpc2(rpcInfo, webView, savedState, uri, portId, webViewUid, origin)
  }
  // legacy
  if (rpcInfo.type !== 'web-worker') {
    throw new Error(`only web worker rpc is supported for webviews`)
  }
  return CreateWebWorkerRpcLegacy.createWebViewRpc(rpcInfo, webView, savedState, uri, portId, webViewUid, origin)
}
