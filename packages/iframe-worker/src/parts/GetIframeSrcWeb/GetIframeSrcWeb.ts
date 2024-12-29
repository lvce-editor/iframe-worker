import type { IframeSrcInfo } from '../IframeSrcInfo/IframeSrcInfo.ts'
import * as GetBlobUrl from '../GetBlobUrl/GetBlobUrl.ts'
import * as GetWebViewBaseUrl from '../GetWebViewBaseUrl/GetWebViewBaseUrl.ts'
import * as GetWebViewHtml from '../GetWebViewHtml/GetWebViewHtml.ts'

export const getIframeSrc = (webView: any, locationOrigin: string, assetDir: string): IframeSrcInfo | undefined => {
  const baseUrl = GetWebViewBaseUrl.getWebViewBaseUrl(webView, locationOrigin)
  const srcHtml = GetWebViewHtml.getWebViewHtml(baseUrl, locationOrigin, webView.elements, assetDir)
  if (srcHtml) {
    const blobUrl = GetBlobUrl.getBlobUrl(srcHtml, 'text/html')
    return {
      iframeSrc: blobUrl,
      webViewRoot: '',
      iframeContent: '',
    }
  }
  return undefined
}
