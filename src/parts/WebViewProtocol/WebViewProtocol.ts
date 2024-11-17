import * as Platform from '../Platform/Platform.js'
import * as PlatformType from '../PlatformType/PlatformType.js'
import * as WebViewProtocolElectron from '../WebViewProtocolElectron/WebViewProtocolElectron.ts'
import * as WebViewProtocolRemote from '../WebViewProtocolRemote/WebViewProtocolRemote.ts'
import * as WebViewProtocolWeb from '../WebViewProtocolWeb/WebViewProtocolWeb.ts'

const getModule = (platform: number) => {
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
) => {
  const module = getModule(Platform.platform)
  return module.register(previewServerId, webViewPort, frameAncestors, webViewRoot, csp, iframeContent)
}
