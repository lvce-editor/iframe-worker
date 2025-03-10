import type { WebView } from '../WebView/WebView.ts'
import * as CreateSecondaryWebViewConnection from '../CreateSecondaryWebViewConnection/CreateSecondaryWebViewConnection.ts'
import * as CreateWebViewConnection from '../CreateWebViewConnection/CreateWebViewConnection.ts'
import * as GetPortQuadruple from '../GetPortQuadruple/GetPortQuadruple.ts'
import * as GetWebViewWorkerRpc2 from '../GetWebViewWorkerRpc2/GetWebViewWorkerRpc2.ts'
import * as NotifyInterceptors from '../NotifyInterceptors/NotifyInterceptors.ts'
import * as ProxyPorts from '../ProxyPorts/ProxyPorts.ts'
import * as RpcState from '../RpcState/RpcState.ts'

export const createWebWorkerRpc2 = async (
  rpcInfo: any,
  webView: any,
  savedState: any,
  uri: string,
  portId: number,
  webViewUid: number,
  origin: string,
): Promise<any> => {
  const rpc = await GetWebViewWorkerRpc2.getWebViewWorkerRpc2(rpcInfo)
  const webViewInfo: WebView = {
    rpc,
    webViewId: webView.id,
    portId: portId,
    webViewUid,
    origin,
  }
  RpcState.set(portId, webViewInfo)

  // TODO this connection might not be needed
  await CreateWebViewConnection.createWebViewConnection(webViewUid, origin)

  const { port1, port2, port3, port4 } = GetPortQuadruple.getPortQuadruple()
  await CreateSecondaryWebViewConnection.createSecondaryWebViewConnection(webViewUid, origin, port1)

  // TODO remove message listeners on dispose
  port2.addEventListener('message', (event: any): void => {
    NotifyInterceptors.notifyInterceptors(event.data)
  })

  port3.addEventListener('message', (event: any): void => {
    NotifyInterceptors.notifyInterceptors(event.data)
  })
  ProxyPorts.proxyPorts(port2, port3)
  port1.start()
  port2.start()
  port3.start()
  port4.start()

  await rpc.invokeAndTransfer('_WebView.setPort', portId, port4)
  await rpc.invoke('_WebView.create', { id: portId, savedState, webViewId: webView.id, uri })
}
