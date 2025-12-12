import type { Rpc } from '@lvce-editor/rpc'

export interface WebView {
  readonly origin: string
  readonly portId: number
  readonly rpc: Rpc
  readonly webViewId: string
  readonly webViewUid: number
}
