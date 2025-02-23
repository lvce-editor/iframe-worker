import * as RpcState from '../RpcState/RpcState.ts'

export const getWebViewInfo = (webViewId: string): any => {
  const rpcs = RpcState.getAll()
  for (const value of Object.values(rpcs)) {
    if (value.webViewId === webViewId) {
      return value
    }
  }
  return undefined
}
