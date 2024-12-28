const CrossOriginIsolated = 'cross-origin-isolated'

export const getIframePermissionPolicy = (webView: any): readonly string[] => {
  const extensionAllow = webView.allow || []
  if (extensionAllow.includes(CrossOriginIsolated)) {
    return extensionAllow
  }
  return [CrossOriginIsolated, ...extensionAllow]
}
