import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as WebViewProtocolElectron from '../WebViewProtocolElectron/WebViewProtocolElectron.ts'
import * as WebViewProtocolRemote from '../WebViewProtocolRemote/WebViewProtocolRemote.ts'
import * as WebViewProtocolWeb from '../WebViewProtocolWeb/WebViewProtocolWeb.ts'

export const getModule = (platform: number): any => {
  switch (platform) {
    case PlatformType.Remote:
      return WebViewProtocolRemote.register
    case PlatformType.Electron:
      return WebViewProtocolElectron.register
    case PlatformType.Web:
    default:
      return WebViewProtocolWeb.register
  }
}