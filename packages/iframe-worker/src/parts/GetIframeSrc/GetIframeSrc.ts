import type { IframeSrcInfo } from '../IframeSrcInfo/IframeSrcInfo.ts'
import * as GetIframeSrcRemote from '../GetIframeSrcRemote/GetIframeSrcRemote.ts'
import * as GetIframeSrcWeb from '../GetIframeSrcWeb/GetIframeSrcWeb.ts'
import * as GetWebView from '../GetWebView/GetWebView.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import { VError } from '../VError/VError.ts'

export const getIframeSrc = (
  webViews: readonly any[],
  webViewId: string,
  webViewPort: string,
  root: string,
  isGitpod: boolean,
  locationProtocol: string,
  locationHost: string,
  locationOrigin: string,
  platform: number,
  assetDir: string,
  webViewScheme: string,
  useNewWebViewHandler: boolean,
): IframeSrcInfo | undefined => {
  try {
    const webView = GetWebView.getWebView(webViews, webViewId)
    if (platform === PlatformType.Web) {
      return GetIframeSrcWeb.getIframeSrc(webView, locationOrigin, assetDir)
    }
    return GetIframeSrcRemote.getIframeSrcRemote(
      webViews,
      webViewPort,
      webViewId,
      locationProtocol,
      locationOrigin,
      locationHost,
      isGitpod,
      root,
      platform,
      assetDir,
      webViewScheme,
      useNewWebViewHandler,
    )
  } catch (error) {
    throw new VError(error, `Failed to construct webview iframe src`)
  }
}
