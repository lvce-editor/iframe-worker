import * as ExtensionHostState from '../ExtensionHost/ExtensionHostState.ts'

export const getSavedWebViewState = async (id: string): Promise<any> => {
  const states = await ExtensionHostState.getSavedState()
  if (!states) {
    return undefined
  }
  if (!Array.isArray(states)) {
    return undefined
  }
  for (const item of states) {
    if (item && item.key && item.key === id && item.value && item.value.state) {
      return item.value.state
    }
    if (item && item.key && item.key === id && item.value) {
      return item.value
    }
  }
  return undefined
}
