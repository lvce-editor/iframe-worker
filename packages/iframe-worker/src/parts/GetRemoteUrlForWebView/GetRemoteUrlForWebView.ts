import * as Assert from '@lvce-editor/assert'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { GetRemoteUrlOptions } from '../GetRemoteUrlOptions/GetRemoteUrlOptions.ts'
import * as CreateWebViewConnection from '../CreateWebViewConnection/CreateWebViewConnection.ts'
import * as RpcState from '../RpcState/RpcState.ts'

// TODO if webViewId is provided,
// 1. read file as blob
// 2. send blob to webview
// 3. create objecturl in webview
// 4. send back objecturl to extension host worker
// 5. provide objectUrl to extension

export const getRemoteUrlForWebView = async (options: GetRemoteUrlOptions): Promise<string> => {
  Assert.object(options)
  const webView = RpcState.get(options.id)
  Assert.object(webView)
  const rpcPromise = CreateWebViewConnection.createWebViewConnection(webView.webViewUid, webView.origin)
  const blobPromise = RendererWorker.invoke('FileSystem.getBlob', options.uri)
  const [rpc, blob] = await Promise.all([rpcPromise, blobPromise])
  const objectUrl = await rpc.invoke('createObjectUrl', blob)
  return objectUrl
}
