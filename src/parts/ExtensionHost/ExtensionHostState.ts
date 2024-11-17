import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as ExtensionStateStorage from '../ExtensionStateStorage/ExtensionStateStorage.ts'

export const saveState = async () => {
  const state = await ExtensionHostWorker.invoke('SaveState.saveState')
  return state
}

export const getSavedState = async () => {
  const value = await ExtensionStateStorage.getJson()
  return value
}
