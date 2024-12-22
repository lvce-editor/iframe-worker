export const getWebViewTitle = (webView: any): string => {
  if (webView && webView.elements && Array.isArray(webView.elements)) {
    for (const item of webView.elements) {
      if (item && item.type === 'title' && typeof item.value === 'string') {
        return item.value
      }
    }
  }
  return 'WebView'
}
