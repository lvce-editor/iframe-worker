export const getWebView = (webViews: any, webViewId: any): any => {
  for (const webView of webViews) {
    if (webView.id === webViewId) {
      return webView
    }
  }
  return undefined
}
