import type { GetRemoteUrlOptions } from '../GetRemoteUrlOptions/GetRemoteUrlOptions.ts'
import * as CreateWebViewConnection from '../CreateWebViewConnection/CreateWebViewConnection.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import * as RpcState from '../RpcState/RpcState.ts'

// TODO if webViewId is provided,
// 1. read file as blob
// 2. send blob to webview
// 3. create objecturl in webview
// 4. send back objecturl to extension host worker
// 5. provide objectUrl to extension

export const getRemoteUrlForWebView = async (options: GetRemoteUrlOptions): Promise<string> => {
  const webView = RpcState.get(options.id)
  const rpcPromise = CreateWebViewConnection.createWebViewConnection(webView.webViewUid, webView.origin)
  const blobPromise = RendererWorker.invoke('FileSystem.getBlob', options.uri)
  const [rpc, blob] = await Promise.all([rpcPromise, blobPromise])
  const objectUrl = await rpc.invoke('createObjectUrl', blob)
  return objectUrl
}
