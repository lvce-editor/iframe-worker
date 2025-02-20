import type { BaseWebViewInfo } from '../BaseWebViewInfo/BaseWebViewInfo.ts'

export const getWebView = (webViews: readonly BaseWebViewInfo[], webViewId: string): BaseWebViewInfo | undefined => {
  for (const webView of webViews) {
    if (webView.id === webViewId) {
      return webView
    }
  }
  return undefined
}
