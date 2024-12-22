import * as Rpc from '../Rpc/Rpc.ts'

export const invoke = async (method: string, ...params: any[]): Promise<any> => {
  return Rpc.invoke('WebView.compatExtensionHostWorkerInvoke', method, ...params)
}

export const invokeAndTransfer = async (method: string, ...params: any[]): Promise<any> => {
  return Rpc.invokeAndTransfer('WebView.compatExtensionHostWorkerInvokeAndTransfer', method, ...params)
}
