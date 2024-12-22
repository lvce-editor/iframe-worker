import type { IframeSrcInfo } from '../IframeSrcInfo/IframeSrcInfo.ts'
import * as CreateLocalHostUrl from '../CreateLocalHostUrl/CreateLocalHostUrl.ts'
import * as GetWebView from '../GetWebView/GetWebView.ts'
import * as GetWebViewHtml from '../GetWebViewHtml/GetWebViewHtml.ts'
import * as GetWebViewUri from '../GetWebViewUri/GetWebViewUri.ts'
import * as IsWindowsPath from '../IsWindowsPath/IsWindowsPath.ts'
import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as Scheme from '../Scheme/Scheme.ts'

export const getIframeSrcRemote = (
  webViews: any,
  webViewPort: any,
  webViewId: any,
  locationProtocol: string,
  locationHost: string,
  isGitpod: boolean,
  root: string,
  platform = Platform.platform,
  assetDir: string,
): IframeSrcInfo | undefined => {
  const webView = GetWebView.getWebView(webViews, webViewId)
  const webViewUri = GetWebViewUri.getWebViewUri(webViews, webViewId)
  if (!webViewUri) {
    return undefined
  }
  let iframeSrc = webViewUri
  let webViewRoot = webViewUri

  // TODO simplify path handling, always use uris so that paths on windows, linux and macos are the same

  if (platform === PlatformType.Electron) {
    const relativePath = new URL(webViewUri).pathname.replace('/index.html', '')
    iframeSrc = `${Scheme.WebView}://-${relativePath}/`
    // TODO
  } else if (platform === PlatformType.Remote) {
    const relativePath = new URL(webViewUri).pathname.replace('/index.html', '')
    if (webViewUri.startsWith('file://')) {
      // ignore
      webViewRoot = webViewUri.slice('file://'.length).replace('/index.html', '')
    } else if (IsWindowsPath.isWindowsPath(relativePath)) {
      webViewRoot = relativePath
    } else {
      webViewRoot = root + relativePath
    }
    iframeSrc = CreateLocalHostUrl.createLocalHostUrl(locationProtocol, locationHost, isGitpod, webViewPort)
  }
  let iframeContent = GetWebViewHtml.getWebViewHtml('', '', webView.elements, assetDir)
  // TODO either
  // - load webviews the same as in web using blob urls
  // - load webviews from a pattern like /webviews/:id/:fileName
  if (!webView.path) {
    iframeContent = iframeContent.replaceAll('/media/', '/').replaceAll('//', '/')
  }
  return {
    srcDoc: '',
    iframeSrc,
    webViewRoot,
    iframeContent,
  }
}
