import * as Rpc from '../Rpc/Rpc.ts'

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  // @ts-ignore
  return Rpc.invoke('WebView.compatSharedProcessInvoke', method, ...params)
}
