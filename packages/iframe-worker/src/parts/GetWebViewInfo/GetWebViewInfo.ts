import type { WebViewInfo } from '../WebViewInfo/WebViewInfo.ts'
import * as RpcState from '../RpcState/RpcState.ts'

export const getWebViewInfo = (webViewId: string): WebViewInfo | undefined => {
  const rpcs = RpcState.getAll()
  for (const value of Object.values(rpcs)) {
    if (value.webViewId === webViewId) {
      return {
        origin: value.origin,
        uid: value.webViewUid,
      }
    }
  }
  return undefined
}
