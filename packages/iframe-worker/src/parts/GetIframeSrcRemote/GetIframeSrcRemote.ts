import type { IframeSrcInfo } from '../IframeSrcInfo/IframeSrcInfo.ts'
import * as CreateLocalHostUrl from '../CreateLocalHostUrl/CreateLocalHostUrl.ts'
import * as GetIframeSrcRemoteBaseUrl from '../GetIframeSrcRemoteBaseUrl/GetIframeSrcRemoteBaseUrl.ts'
import * as GetWebView from '../GetWebView/GetWebView.ts'
import * as GetWebViewHtml from '../GetWebViewHtml/GetWebViewHtml.ts'
import * as GetWebViewUri from '../GetWebViewUri/GetWebViewUri.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getIframeSrcRemote = (
  webViews: readonly any[],
  webViewPort: string,
  webViewId: string,
  locationProtocol: string,
  locationOrigin: string,
  locationHost: string,
  isGitpod: boolean,
  root: string,
  platform: number,
  assetDir: string,
  webViewScheme: string,
  useNewWebViewHandler: boolean,
): IframeSrcInfo | undefined => {
  const webView = GetWebView.getWebView(webViews, webViewId)
  const webViewUri = GetWebViewUri.getWebViewUri(webViews, webViewId)
  if (!webViewUri) {
    return undefined
  }
  if (!webView) {
    return undefined
  }
  let iframeSrc = webViewUri
  let webViewRoot = webViewUri

  // TODO when running in remote, try scope webviews by path or if possible by domain
  if (platform === PlatformType.Electron) {
    const webViewId = webView.id
    iframeSrc = `${webViewScheme}://${webViewId}`
  } else if (platform === PlatformType.Remote) {
    webViewRoot = webView.uri
    iframeSrc = CreateLocalHostUrl.createLocalHostUrl(locationProtocol, locationHost, isGitpod, webViewPort, webViewId, useNewWebViewHandler)
  }
  const baseUrl = GetIframeSrcRemoteBaseUrl.getIframeSrcRemoteBaseUrl(webViewRoot, locationOrigin, platform, webViewId, useNewWebViewHandler, root)
  const iframeContent = GetWebViewHtml.getWebViewHtml(baseUrl, '', webView.elements, assetDir)
  // TODO either
  // - load webviews the same as in web using blob urls
  // - load webviews from a pattern like /webviews/:id/:fileName
  return {
    iframeContent,
    iframeSrc,
    webViewRoot,
  }
}
