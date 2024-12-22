export const getIframePermissionPolicy = (webView: any): readonly string[] => {
  const extensionAllow = webView.allow || []
  return extensionAllow
}
