import { WebViewProtocolHandler } from '../WebViewProtocolHandler/WebViewProtocolHandler.ts'
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
  // TODO apply something similar for electron
  // TODO pass webview root, so that only these resources can be accessed
  // TODO pass csp configuration to server
  // TODO pass coop / coep configuration to server
  await WebViewServer.create(previewServerId, useNewWebViewHandler) // TODO move this up
  await WebViewServer.start(previewServerId, webViewPort) // TODO move this up
  if (useNewWebViewHandler) {
    await WebViewServer.setInfo2({
      webViewRoot,
      webViewId,
      cnotentSecurityPolicy: csp,
      iframeContent,
      remotePathPrefix,
    })
  } else {
    await WebViewServer.setHandler(previewServerId, frameAncestors, webViewRoot, csp, iframeContent, remotePathPrefix)
  }
  // TODO make this work in gitpod also
}
