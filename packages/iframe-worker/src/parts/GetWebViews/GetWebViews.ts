import * as Rpc from '../Rpc/Rpc.ts'

export const getWebViews = async (): Promise<readonly any[]> => {
  return Rpc.invoke('WebView.getWebViews')
}
