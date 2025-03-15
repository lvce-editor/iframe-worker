import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getIframeSrcRemoteBaseUrl = (
  webViewRoot: string,
  locationOrigin: string,
  platform: number,
  webViewId: string,
  useNewWebViewHandler: boolean,
  root: string,
): string => {
  if (webViewRoot && (webViewRoot.startsWith('http:') || webViewRoot.startsWith('https:'))) {
    if (webViewRoot.startsWith(locationOrigin)) {
      const baseUrl = webViewRoot.slice(locationOrigin.length)
      if (baseUrl.startsWith('/remote')) {
        return baseUrl
      }
      return `/remote${root}${baseUrl}`
    }
    return webViewRoot
  }

  if (platform === PlatformType.Remote && useNewWebViewHandler && webViewId) {
    return `/${webViewId}`
  }
  return ''
}
