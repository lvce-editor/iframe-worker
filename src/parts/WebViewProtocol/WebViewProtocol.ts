import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as WebViewProtocolElectron from '../WebViewProtocolElectron/WebViewProtocolElectron.ts'
import * as WebViewProtocolRemote from '../WebViewProtocolRemote/WebViewProtocolRemote.ts'
import * as WebViewProtocolWeb from '../WebViewProtocolWeb/WebViewProtocolWeb.ts'

const getModule = (platform: number): any => {
  switch (platform) {
    case PlatformType.Remote:
      return WebViewProtocolRemote
    case PlatformType.Electron:
      return WebViewProtocolElectron
    case PlatformType.Web:
    default:
      return WebViewProtocolWeb
  }
}

export const register = async (
  previewServerId: number,
  webViewPort: string,
  frameAncestors: string,
  webViewRoot: string,
  csp: string,
  iframeContent: string,
): Promise<void> => {
  const module = getModule(Platform.platform)
  return module.register(previewServerId, webViewPort, frameAncestors, webViewRoot, csp, iframeContent)
}
