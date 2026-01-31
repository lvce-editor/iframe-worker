import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { ExtensionHost as ExtensionHostWorker } from '@lvce-editor/rpc-registry'
import type { IframeState } from '../IframeState/IframeState.ts'
import * as CreateAndLoadWebView from '../CreateAndLoadWebView/CreateAndLoadWebView.ts'
import * as CreateWebViewRpc from '../CreateWebViewRpc/CreateWebViewRpc.ts'
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

const connectRpc = async (webView, savedState, uri, portId, id, origin): Promise<void> => {
  // TODO
  await CreateWebViewRpc.createWebViewRpc(webView, savedState, uri, portId, id, origin)
}

export const loadContent = async (state: IframeState, savedState: any): Promise<IframeState> => {
  // @ts-ignore
  const { assetDir, id, platform, uri, webViewScheme } = state

  let root = ''
  if (platform === PlatformType.Remote) {
    root = await SharedProcess.invoke('Platform.getRoot')
  }
  const webViews = await GetWebViews.getWebViews()
  const webViewId = GetWebViewId.getWebViewId(webViews, uri)

  // TODO pass location props as arguments
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
    false,
    locationProtocol,
    locationHost,
    locationOrigin,
    platform,
    assetDir,
    webViewScheme,
    true,
  )

  console.log({ iframeResult })

  if (!iframeResult) {
    return state
  }

  const webView = GetWebView.getWebView(webViews, webViewId)

  const { iframeContent, iframeSrc, webViewRoot } = iframeResult
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

  // // TODO remove this
  await Rpc.invoke('ExtensionHostManagement.activateByEvent', `onWebView:${webViewId}`)

  const portId = Id.create()

  const useNewWebViewHandler = true

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

  console.log({ id, iframeSrc, platform, sandbox })

  // await CreateAndLoadWebView.createAndLoadWebView(id, iframeSrc, sandbox, iframeCsp, credentialless, permissionPolicyString, frameTitle)
  const origin = GetWebViewOrigin.getWebViewOrigin(webViewPort, platform, webViewScheme, webViewId)

  // const hasOldRpc = !webView || !webView.rpc || typeof webView.rpc !== 'string'

  // if (hasOldRpc) {
  //   const { port1, port2 } = GetPortTuple.getPortTuple()
  //   const portType = ''
  //   await SetPort.setPort(id, port1, origin, portType)
  //   await ExtensionHostWorker.invokeAndTransfer('ExtensionHostWebView.create', webViewId, port2, uri, id, origin, webView)
  // }

  // const savedState = await GetSavedWebViewState.getSavedWebViewState(webViewId)

  // if (hasOldRpc) {
  //   await ExtensionHostWorker.invoke('ExtensionHostWebView.load', webViewId, savedState)
  // }

  // TODO need to send port to webview to create connection

  // TODO maybe need to create hidden iframe first

  // TODO would need to wait somehow for iframe to be connected
  setTimeout(async () => {
    await CreateWebViewRpc.createWebViewRpc(webView, savedState, uri, portId, id, origin)
  }, 2000)
  return {
    ...state,
    csp: iframeCsp,
    iframeSrc,
    origin,
    portId,
    sandbox,
  }
}
