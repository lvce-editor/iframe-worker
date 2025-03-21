import type { BaseWebViewInfo } from '../BaseWebViewInfo/BaseWebViewInfo.ts'
import * as Rpc from '../Rpc/Rpc.ts'

export const getWebViews = async (): Promise<readonly BaseWebViewInfo[]> => {
  return Rpc.invoke('WebView.getWebViews')
}
