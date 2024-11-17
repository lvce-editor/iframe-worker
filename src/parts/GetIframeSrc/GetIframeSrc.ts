import * as GetIframeSrcRemote from '../GetIframeSrcRemote/GetIframeSrcRemote.ts'
import * as GetIframeSrcWeb from '../GetIframeSrcWeb/GetIframeSrcWeb.ts'
import * as GetWebView from '../GetWebView/GetWebView.ts'
import { IframeSrcInfo } from '../IframeSrcInfo/IframeSrcInfo.ts'
import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import { VError } from '../VError/VError.ts'

export const getIframeSrc = (
  webViews: any,
  webViewId: any,
  webViewPort: any,
  root: string,
  isGitpod: boolean,
  locationProtocol: string,
  locationHost: string,
  locationOrigin: string,
): IframeSrcInfo | undefined => {
  try {
    const webView = GetWebView.getWebView(webViews, webViewId)
    if (Platform.platform === PlatformType.Web) {
      return GetIframeSrcWeb.getIframeSrc(webView, locationOrigin)
    }
    return GetIframeSrcRemote.getIframeSrcRemote(webViews, webViewPort, webViewId, locationProtocol, locationHost, isGitpod, root)
  } catch (error) {
    throw new VError(error, `Failed to construct webview iframe src`)
  }
}
