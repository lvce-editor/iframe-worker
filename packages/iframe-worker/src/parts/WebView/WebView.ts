import type { Rpc } from '@lvce-editor/rpc'

export interface WebView {
  readonly rpc: Rpc
  readonly webViewId: string
  readonly portId: number
  readonly webViewUid: number
  readonly origin: string
}
