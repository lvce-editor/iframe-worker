import * as AssetDir from '../AssetDir/AssetDir.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as GetIframeSrc from '../GetIframeSrc/GetIframeSrc.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as GetSavedWebViewState from '../GetSavedWebViewState/GetSavedWebViewState.ts'
import * as GetWebView from '../GetWebView/GetWebView.ts'
import * as GetWebViewCsp from '../GetWebViewCsp/GetWebViewCsp.ts'
import * as GetWebViewFrameAncestors from '../GetWebViewFrameAncestors/GetWebViewFrameAncestors.ts'
import * as GetWebViewOrigin from '../GetWebViewOrigin/GetWebViewOrigin.ts'
import * as GetWebViewPermissionPolicy from '../GetWebViewPermissionPolicy/GetWebViewPermissionPolicy.ts'
import * as GetWebViews from '../GetWebViews/GetWebViews.ts'
import * as GetWebViewSandBox from '../GetWebViewSandBox/GetWebViewSandBox.ts'
import * as Id from '../Id/Id.ts'
import * as Location from '../Location/Location.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as Rpc from '../Rpc/Rpc.ts'
import * as SetPort from '../SetPort/SetPort.ts'
import * as SharedProcess from '../SharedProcess/SharedProcess.ts'
import * as WebViewProtocol from '../WebViewProtocol/WebViewProtocol.ts'

export const create2 = async ({
  id,
  webViewPort,
  webViewId,
  previewServerId,
  uri,
  platform,
  isGitpod,
  assetDir = AssetDir.assetDir,
}: {
  platform: number
  id: number
  webViewPort: string
  webViewId: string
  previewServerId: number
  uri: string
  isGitpod: boolean
  assetDir?: string
}): Promise<any> => {
  let root = ''

  if (platform === PlatformType.Remote) {
    root = await SharedProcess.invoke('Platform.getRoot')
  }

  const webViews = await GetWebViews.getWebViews()
  const locationProtocol = Location.getProtocol()
  const locationHost = Location.getHost()
  const locationOrigin = Location.getOrigin()
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
  )

  if (!iframeResult) {
    return undefined
  }

  const webView = GetWebView.getWebView(webViews, webViewId)

  // TODO move all of this to iframe worker
  const { iframeSrc, webViewRoot, srcDoc, iframeContent } = iframeResult
  const frameAncestors = GetWebViewFrameAncestors.getWebViewFrameAncestors(locationProtocol, locationHost)

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
  const credentialless = true

  await Rpc.invoke('ExtensionHostManagement.activateByEvent', `onWebView:${webViewId}`)

  const { port1, port2 } = GetPortTuple.getPortTuple()
  const portId = Id.create()

  await WebViewProtocol.register(previewServerId, webViewPort, frameAncestors, webViewRoot, csp, iframeContent)

  await RendererProcess.invoke('WebView.create', id, iframeSrc, sandbox, iframeCsp, credentialless, permissionPolicyString)

  await RendererProcess.invoke('WebView.load', id)
  const origin = GetWebViewOrigin.getWebViewOrigin(webViewPort, platform)

  const portType = ''
  await SetPort.setPort(id, port1, origin, portType)

  await ExtensionHostWorker.invokeAndTransfer('ExtensionHostWebView.create', webViewId, port2, uri, id, origin)

  const savedState = await GetSavedWebViewState.getSavedWebViewState(webViewId)
  await ExtensionHostWorker.invoke('ExtensionHostWebView.load', webViewId, savedState)
  return {
    srcDoc,
    iframeSrc,
    sandbox,
    portId,
    origin,
    csp: iframeCsp,
  }
}
