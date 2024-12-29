import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as GetCredentialLess from '../GetCredentialLess/GetCredentialLess.ts'
import * as GetIframeSrc from '../GetIframeSrc/GetIframeSrc.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as GetSavedWebViewState from '../GetSavedWebViewState/GetSavedWebViewState.ts'
import * as GetWebView from '../GetWebView/GetWebView.ts'
import * as GetWebViewCsp from '../GetWebViewCsp/GetWebViewCsp.ts'
import * as GetWebViewFrameAncestors from '../GetWebViewFrameAncestors/GetWebViewFrameAncestors.ts'
import * as GetWebViewId from '../GetWebViewId/GetWebViewId.ts'
import * as GetWebViewOrigin from '../GetWebViewOrigin/GetWebViewOrigin.ts'
import * as GetWebViewPermissionPolicy from '../GetWebViewPermissionPolicy/GetWebViewPermissionPolicy.ts'
import * as GetWebViews from '../GetWebViews/GetWebViews.ts'
import * as GetWebViewSandBox from '../GetWebViewSandBox/GetWebViewSandBox.ts'
import * as GetWebViewTitle from '../GetWebViewTitle/GetWebViewTitle.ts'
import * as Id from '../Id/Id.ts'
import * as Location from '../Location/Location.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as Rpc from '../Rpc/Rpc.ts'
import * as SetPort from '../SetPort/SetPort.ts'
import * as SharedProcess from '../SharedProcess/SharedProcess.ts'
import * as WebViewProtocol from '../WebViewProtocol/WebViewProtocol.ts'

export const create3 = async ({
  id,
  uri,
  isGitpod,
  platform,
  assetDir,
  webViewScheme,
}: {
  platform: number
  id: number
  uri: string
  isGitpod: boolean
  assetDir: string
  webViewScheme: string
}): Promise<any> => {
  let root = ''

  if (platform === PlatformType.Remote) {
    root = await SharedProcess.invoke('Platform.getRoot')
  }

  const webViews = await GetWebViews.getWebViews()
  const webViewId = GetWebViewId.getWebViewId(webViews, uri)
  const locationProtocol = Location.getProtocol()
  const locationHost = Location.getHost()
  const locationOrigin = Location.getOrigin()
  const locationPort = Location.getPort()

  const iframeResult = GetIframeSrc.getIframeSrc(
    webViews,
    webViewId,
    webViewPort,
    root,
    isGitpod,
    locationProtocol,
    locationHost,
    locationOrigin,
    platform,
    assetDir,
    webViewScheme,
  )

  if (!iframeResult) {
    return undefined
  }

  const webView = GetWebView.getWebView(webViews, webViewId)

  // TODO move all of this to iframe worker
  const { iframeSrc, webViewRoot, srcDoc, iframeContent } = iframeResult
  const frameAncestors = GetWebViewFrameAncestors.getWebViewFrameAncestors(locationProtocol, locationHost)

  const frameTitle = GetWebViewTitle.getWebViewTitle(webView)
  // TODO figure out order for events, e.g.
  // 1. activate extension, create webview and ports in parallel
  // 2. wait for webview to load (?)
  // 3. setup extension host worker rpc
  // 4. create webview in extension host worker and load content

  const csp = GetWebViewCsp.getWebViewCsp(webView)
  const sandbox = GetWebViewSandBox.getIframeSandbox(webView, platform)
  const permissionPolicy = GetWebViewPermissionPolicy.getIframePermissionPolicy(webView)
  const permissionPolicyString = permissionPolicy.join('; ')
  const iframeCsp = platform === PlatformType.Web ? csp : ''
  const credentialless = GetCredentialLess.getCredentialLess(locationHost)

  await Rpc.invoke('ExtensionHostManagement.activateByEvent', `onWebView:${webViewId}`)

  const { port1, port2 } = GetPortTuple.getPortTuple()
  const portId = Id.create()

  await WebViewProtocol.register(previewServerId, webViewPort, frameAncestors, webViewRoot, csp, iframeContent, platform, webViewId)

  await RendererProcess.invoke('WebView.create', id, iframeSrc, sandbox, iframeCsp, credentialless, permissionPolicyString, frameTitle)

  // TODO maybe iframe waitForLoad is not needed. since it cannot be used detect errors anyway
  // and causes flash of unstyled content, maybe a better way would be to just send the
  // port and wait for the first port message
  await RendererProcess.invoke('WebView.load', id)
  const origin = GetWebViewOrigin.getWebViewOrigin(webViewPort, platform, webViewScheme, webViewId)

  const portType = ''
  await SetPort.setPort(id, port1, origin, portType)

  await ExtensionHostWorker.invokeAndTransfer('ExtensionHostWebView.create', webViewId, port2, uri, id, origin, webView)

  const savedState = await GetSavedWebViewState.getSavedWebViewState(webViewId)

  console.log('before load')
  await ExtensionHostWorker.invoke('ExtensionHostWebView.load', webViewId, savedState)
  console.log('after load')
  return {
    srcDoc,
    iframeSrc,
    sandbox,
    portId,
    origin,
    csp: iframeCsp,
  }
}
