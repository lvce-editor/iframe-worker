import * as CreateAndLoadWebView from '../CreateAndLoadWebView/CreateAndLoadWebView.ts'
import * as CreateWebViewRpc from '../CreateWebViewRpc/CreateWebViewRpc.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as GetCredentialLess from '../GetCredentialLess/GetCredentialLess.ts'
import * as GetIframeSrc from '../GetIframeSrc/GetIframeSrc.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as GetPreviewServerId from '../GetPreviewServerId/GetPreviewServerId.ts'
import * as GetSavedWebViewState from '../GetSavedWebViewState/GetSavedWebViewState.ts'
import * as GetWebView from '../GetWebView/GetWebView.ts'
import * as GetWebViewCsp from '../GetWebViewCsp/GetWebViewCsp.ts'
import * as GetWebViewFrameAncestors from '../GetWebViewFrameAncestors/GetWebViewFrameAncestors.ts'
import * as GetWebViewId from '../GetWebViewId/GetWebViewId.ts'
import * as GetWebViewOrigin from '../GetWebViewOrigin/GetWebViewOrigin.ts'
import * as GetWebViewPermissionPolicy from '../GetWebViewPermissionPolicy/GetWebViewPermissionPolicy.ts'
import * as GetWebViewPort from '../GetWebViewPort/GetWebViewPort.ts'
import * as GetWebViews from '../GetWebViews/GetWebViews.ts'
import * as GetWebViewSandBox from '../GetWebViewSandBox/GetWebViewSandBox.ts'
import * as GetWebViewTitle from '../GetWebViewTitle/GetWebViewTitle.ts'
import * as Id from '../Id/Id.ts'
import * as Location from '../Location/Location.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
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
  useNewWebViewHandler,
}: {
  readonly platform: number
  readonly id: number
  readonly uri: string
  readonly isGitpod: boolean
  readonly assetDir: string
  readonly webViewScheme: string
  readonly useNewWebViewHandler?: boolean
}): Promise<any> => {
  PlatformState.setPlatform(platform)
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
  const webViewPort = GetWebViewPort.getWebViewPort(platform, locationPort)
  const previewServerId = GetPreviewServerId.getPreviewServerId()
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
    useNewWebViewHandler || false,
  )

  if (!iframeResult) {
    return undefined
  }

  const webView = GetWebView.getWebView(webViews, webViewId)

  const { iframeSrc, webViewRoot, iframeContent } = iframeResult
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

  // TODO remove this
  await Rpc.invoke('ExtensionHostManagement.activateByEvent', `onWebView:${webViewId}`)

  const portId = Id.create()

  const remotePathPrefix = '/remote'
  await WebViewProtocol.register(
    previewServerId,
    webViewPort,
    frameAncestors,
    webViewRoot,
    csp,
    iframeContent,
    platform,
    webViewId,
    remotePathPrefix,
    useNewWebViewHandler,
  )

  await CreateAndLoadWebView.createAndLoadWebView(id, iframeSrc, sandbox, iframeCsp, credentialless, permissionPolicyString, frameTitle)
  const origin = GetWebViewOrigin.getWebViewOrigin(webViewPort, platform, webViewScheme, webViewId)

  const hasOldRpc = !webView || !webView.rpc || typeof webView.rpc !== 'string'

  if (hasOldRpc) {
    const { port1, port2 } = GetPortTuple.getPortTuple()
    const portType = ''
    await SetPort.setPort(id, port1, origin, portType)
    await ExtensionHostWorker.invokeAndTransfer('ExtensionHostWebView.create', webViewId, port2, uri, id, origin, webView)
  }

  const savedState = await GetSavedWebViewState.getSavedWebViewState(webViewId)

  if (hasOldRpc) {
    await ExtensionHostWorker.invoke('ExtensionHostWebView.load', webViewId, savedState)
  }

  await CreateWebViewRpc.createWebViewRpc(webView, savedState, uri, portId, id, origin)
  return {
    iframeSrc,
    sandbox,
    portId,
    origin,
    csp: iframeCsp,
  }
}
