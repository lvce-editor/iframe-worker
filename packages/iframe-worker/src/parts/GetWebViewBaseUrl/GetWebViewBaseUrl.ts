import * as GetDefaultBaseUrl from '../GetDefaultBaseUrl/GetDefaultBaseUrl.ts'

export const getWebViewBaseUrl = (webView: any, locationOrigin: string): string => {
  const defaultBaseUrl = GetDefaultBaseUrl.getDefaultBaseUrl(webView)
  if (defaultBaseUrl.startsWith(locationOrigin)) {
    return defaultBaseUrl.slice(locationOrigin.length)
  }
  return defaultBaseUrl
}
