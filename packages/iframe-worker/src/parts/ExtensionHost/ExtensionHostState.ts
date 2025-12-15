import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const saveState = async (): Promise<any> => {
  const state = await ExtensionHostWorker.invoke('SaveState.saveState')
  return state
}

export const getSavedState = async (): Promise<any> => {
  // @ts-ignore
  return Rpc.invoke('WebView.getSavedState')
}
