import type { Rpc } from '@lvce-editor/rpc'

export interface WebView {
  readonly rpc: Rpc
  readonly webViewId: string
}
