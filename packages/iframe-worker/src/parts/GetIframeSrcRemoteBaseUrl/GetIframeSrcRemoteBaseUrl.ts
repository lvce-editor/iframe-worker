export const getIframeSrcRemoteBaseUrl = (webViewRoot: string, locationOrigin: string): string => {
  if ((webViewRoot && webViewRoot.startsWith('http:')) || webViewRoot.startsWith('https:')) {
    if (webViewRoot.startsWith(locationOrigin)) {
      return webViewRoot.slice(locationOrigin.length)
    }
    return webViewRoot
  }
  return ''
}
