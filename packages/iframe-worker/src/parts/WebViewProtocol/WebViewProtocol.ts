import * as GetWebViewProtocolModule from '../GetWebViewProtocolModule/GetWebViewProtocolModule.ts'

export const register = async (
  previewServerId: number,
  webViewPort: string,
  frameAncestors: string,
  webViewRoot: string,
  csp: string,
  iframeContent: string,
  platform: number,
  webViewId: string,
): Promise<void> => {
  const fn = GetWebViewProtocolModule.getModule(platform)
  return fn(previewServerId, webViewPort, frameAncestors, webViewRoot, csp, iframeContent, webViewId)
}
