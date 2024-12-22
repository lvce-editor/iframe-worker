import * as GetWebView from '../GetWebView/GetWebView.ts'

const getWebViewPath = (webViews: any, webViewId: any): string => {
  const webView = GetWebView.getWebView(webViews, webViewId)
  if (!webView) {
    return ''
  }
  return webView.path
}

export const getWebViewUri = (webViews: any, webViewId: any): string => {
  const webViewPath = getWebViewPath(webViews, webViewId)
  if (!webViewPath) {
    return ''
  }
  if (webViewPath.startsWith('/')) {
    // TODO make it work on windows also
    return `file://${webViewPath}`
  }
  return webViewPath
}
