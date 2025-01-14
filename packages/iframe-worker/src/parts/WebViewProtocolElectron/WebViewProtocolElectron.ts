import type { WebViewProtocolHandler } from '../WebViewProtocolHandler/WebViewProtocolHandler.ts'
import * as WebViewServer from '../WebViewServer/WebViewServer.ts'

export const register: WebViewProtocolHandler = async (
  previewServerId,
  webViewPort,
  frameAncestors,
  webViewRoot,
  csp,
  iframeContent,
  webViewId,
  remotePathPrefix,
  useNewWebViewHandler,
) => {
  await WebViewServer.registerProtocol()
  await WebViewServer.create(previewServerId, useNewWebViewHandler) // TODO move this up

  // TODO send info to electron which domain maps to which webview root.
  // for example, video-preview maps to domain lvce-oss-webview://video-preview
  // and webview root  /home/user/lvce/extensions/video-preview
  // Then the request handler can decide by domain which webview root to use.
  // Another option would be in electron to check what iframe (webContents)
  // responds to which webviewRoot and setting a webviewRoot per webContents instance
  await WebViewServer.setInfo(previewServerId, webViewId, webViewRoot, csp, iframeContent)
}
