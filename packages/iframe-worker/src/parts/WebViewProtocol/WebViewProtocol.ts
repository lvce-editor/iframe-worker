import * as GetWebViewProtocolModule from '../GetWebViewProtocolModule/GetWebViewProtocolModule.ts'
import * as Platform from '../Platform/Platform.ts'

export const register = async (
  previewServerId: number,
  webViewPort: string,
  frameAncestors: string,
  webViewRoot: string,
  csp: string,
  iframeContent: string,
): Promise<void> => {
  const fn = GetWebViewProtocolModule.getModule(Platform.platform)
  return fn(previewServerId, webViewPort, frameAncestors, webViewRoot, csp, iframeContent)
}
