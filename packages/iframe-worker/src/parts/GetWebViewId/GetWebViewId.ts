export const getWebViewId = (webViews: readonly any[], uri: string): string => {
  if (uri.startsWith('webview://')) {
    const webViewId = uri.slice('webview://'.length)
    return webViewId
  }
  for (const webView of webViews) {
    const selectors = webView.selector || []
    for (const selector of selectors) {
      if (uri.endsWith(selector)) {
        return webView.id
      }
    }
  }
  return ''
}
