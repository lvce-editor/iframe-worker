import * as Rpc from '../Rpc/Rpc.ts'

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  // @ts-ignore
  return Rpc.invoke('WebView.compatExtensionHostWorkerInvoke', method, ...params)
}

export const invokeAndTransfer = async (method: string, ...params: readonly any[]): Promise<any> => {
  // @ts-ignore
  return Rpc.invokeAndTransfer('WebView.compatExtensionHostWorkerInvokeAndTransfer', method, ...params)
}
