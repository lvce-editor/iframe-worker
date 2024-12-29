export const getWebViewId = async (webViews: readonly any[], uri: string): Promise<string> => {
  if (uri.startsWith('webview://')) {
    const webViewId = uri.slice('webview://'.length)
    return webViewId
  }
  for (const webView of webViews) {
    for (const selector of webView.selector || []) {
      if (uri.endsWith(selector)) {
        return webView.id
      }
    }
  }
  return ''
}
