import type { WebViewProtocolHandler } from '../WebViewProtocolHandler/WebViewProtocolHandler.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as WebViewProtocolElectron from '../WebViewProtocolElectron/WebViewProtocolElectron.ts'
import * as WebViewProtocolRemote from '../WebViewProtocolRemote/WebViewProtocolRemote.ts'
import * as WebViewProtocolWeb from '../WebViewProtocolWeb/WebViewProtocolWeb.ts'

export const getModule = (platform: number): WebViewProtocolHandler => {
  switch (platform) {
    case PlatformType.Electron:
      return WebViewProtocolElectron.register
    case PlatformType.Remote:
      return WebViewProtocolRemote.register
    default:
      return WebViewProtocolWeb.register
  }
}
