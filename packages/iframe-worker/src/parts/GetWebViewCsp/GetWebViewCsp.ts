import * as GetContentSecurityPolicy from '../GetContentSecurityPolicy/GetContentSecurityPolicy.ts'

export const getWebViewCsp = (webView: any): string => {
  if (webView && webView.contentSecurityPolicy) {
    return GetContentSecurityPolicy.getContentSecurityPolicy(webView.contentSecurityPolicy)
  }
  const csp = GetContentSecurityPolicy.getContentSecurityPolicy([
    `default-src 'none'`,
    `script-src 'self'`,
    `style-src 'self'`,
    `img-src 'self'`,
    `media-src 'self'`,
  ])
  return csp
}
