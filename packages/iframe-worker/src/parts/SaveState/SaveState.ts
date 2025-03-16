import * as RpcState from '../RpcState/RpcState.ts'
import { VError } from '../VError/VError.ts'

export const saveState = async (): Promise<readonly any[]> => {
  const all = RpcState.getAll()
  const serialized = []
  for (const value of Object.values(all)) {
    try {
      const savedState = await value.rpc.invoke('WebView.saveState', value.portId)
      serialized.push({
        key: value.webViewId,
        value: savedState,
      })
    } catch (error) {
      console.error(new VError(error, 'Failed to save state'))
      // ignore
    }
  }
  return serialized
}
