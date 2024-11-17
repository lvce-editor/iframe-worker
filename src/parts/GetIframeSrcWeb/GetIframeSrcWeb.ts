import * as GetBlobUrl from '../GetBlobUrl/GetBlobUrl.ts'
import * as GetWebViewBaseUrl from '../GetWebViewBaseUrl/GetWebViewBaseUrl.ts'
import * as GetWebViewHtml from '../GetWebViewHtml/GetWebViewHtml.ts'
import type { IframeSrcInfo } from '../IframeSrcInfo/IframeSrcInfo.ts'

export const getIframeSrc = (webView: any, locationOrigin: string): IframeSrcInfo | undefined => {
  const baseUrl = GetWebViewBaseUrl.getWebViewBaseUrl(webView)
  const srcHtml = GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, webView.elements)
  if (srcHtml) {
    const blobUrl = GetBlobUrl.getBlobUrl(srcHtml, 'text/html')
    return {
      srcDoc: '',
      iframeSrc: blobUrl,
      webViewRoot: '',
      iframeContent: '',
    }
  }
  return undefined
}
