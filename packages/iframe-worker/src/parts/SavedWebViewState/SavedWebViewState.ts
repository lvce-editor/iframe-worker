import * as Rpc from '../Rpc/Rpc.ts'

export const getSavedState = async (): Promise<any> => {
  // @ts-ignore
  return Rpc.invoke('WebView.getSavedState')
}
