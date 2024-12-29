export interface WebViewProtocolHandler {
  (
    previewServerId: number,
    webViewPort: string,
    frameAncestors: string,
    webViewRoot: string,
    csp: string,
    iframeContent: string,
    webViewId: string,
    remotePathPrefix: string,
    useNewWebViewHandler?: boolean,
  ): Promise<void>
}
