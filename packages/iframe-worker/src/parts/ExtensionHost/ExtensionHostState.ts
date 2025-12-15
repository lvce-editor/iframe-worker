<<<<<<< HEAD
import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
=======
import { ExtensionHost as ExtensionHostWorker } from '@lvce-editor/rpc-registry'
import * as Rpc from '../Rpc/Rpc.ts'
>>>>>>> origin/main

export const saveState = async (): Promise<any> => {
  const state = await ExtensionHostWorker.invoke('SaveState.saveState')
  return state
}

export const getSavedState = async (): Promise<any> => {
  // @ts-ignore
  return Rpc.invoke('WebView.getSavedState')
}
