import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'
import type { BaseWebViewInfo } from '../BaseWebViewInfo/BaseWebViewInfo.ts'

export const getWebViews = async (): Promise<readonly BaseWebViewInfo[]> => {
  // @ts-ignore
  return Rpc.invoke('WebView.getWebViews')
}
