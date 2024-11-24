import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as Rpc from '../Rpc/Rpc.ts'

export const saveState = async (): Promise<any> => {
  const state = await ExtensionHostWorker.invoke('SaveState.saveState')
  return state
}

export const getSavedState = async (): Promise<any> => {
  return Rpc.invoke('WebView.getSavedState')
}
