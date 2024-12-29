import * as SharedProcess from '../SharedProcess/SharedProcess.ts'

export const registerProtocol = async (): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.registerProtocol')
}

export const create = async (previewServerId: number, useNewWebViewHandler?: boolean): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.create', previewServerId, useNewWebViewHandler)
}

export const start = async (previewServerId: number, webViewPort: string): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.start', previewServerId, webViewPort)
}

export const setInfo2 = async (info: any): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.setInfo2', info)
}

export const setInfo = async (
  previewServerId: number,
  webViewId: string,
  webViewRoot: string,
  contentSecurityPolicy: string,
  iframeContent: string,
): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.setInfo', previewServerId, webViewId, webViewRoot, contentSecurityPolicy, iframeContent)
}

export const setHandler = async (
  previewServerId: number,
  frameAncestors: string,
  webViewRoot: string,
  contentSecurityPolicy: string,
  iframeContent: string,
  remotePathPrefix: string,
): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.setHandler', previewServerId, frameAncestors, webViewRoot, contentSecurityPolicy, iframeContent)
}
