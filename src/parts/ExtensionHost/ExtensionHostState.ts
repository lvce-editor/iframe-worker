import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as ExtensionStateStorage from '../ExtensionStateStorage/ExtensionStateStorage.ts'

export const saveState = async (): Promise<any> => {
  const state = await ExtensionHostWorker.invoke('SaveState.saveState')
  return state
}

export const getSavedState = async (): Promise<any> => {
  const value = await ExtensionStateStorage.getJson()
  return value
}
