import * as SharedProcess from '../SharedProcess/SharedProcess.ts'

export const registerProtocol = async (): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.registerProtocol')
}

export const create = async (previewServerId: number): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.create', previewServerId)
}

export const start = async (previewServerId: number, webViewPort: string): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.start', previewServerId, webViewPort)
}

export const setHandler = async (
  previewServerId: number,
  frameAncestors: string,
  webViewRoot: string,
  contentSecurityPolicy: string,
  iframeContent: string,
): Promise<void> => {
  await SharedProcess.invoke('WebViewServer.setHandler', previewServerId, frameAncestors, webViewRoot, contentSecurityPolicy, iframeContent)
}
