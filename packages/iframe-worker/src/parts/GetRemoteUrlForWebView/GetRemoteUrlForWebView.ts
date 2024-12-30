import type { GetRemoteUrlOptions } from '../GetRemoteUrlOptions/GetRemoteUrlOptions.ts'

// TODO if webViewId is provided,
// 1. read file as blob
// 2. send blob to webview
// 3. create objecturl in webview
// 4. send back objecturl to extension host worker
// 5. provide objectUrl to extension

export const getRemoteUrlForWebView = async (options: GetRemoteUrlOptions): Promise<string> => {
  throw new Error('not implemented')
  // TODO webviews should be stored in iframe worker
  // const webView = ExtensionHostWebViewState.getWebView(options.webViewId as string)
  // if (!webView) {
  //   throw new Error(`webview ${options.webViewId} not found`)
  // }
  // const [rpc, blob] = await Promise.all([CreateWebViewIpc.createWebViewIpc(webView), Rpc.invoke('FileSystem.getBlob', uri)])
  // const objectUrl = await rpc.invoke('createObjectUrl', blob)
  // return objectUrl
}
