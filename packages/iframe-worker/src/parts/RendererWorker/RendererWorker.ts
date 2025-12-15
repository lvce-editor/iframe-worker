import { RendererWorker } from '@lvce-editor/rpc-registry'

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  // @ts-ignore
  return RendererWorker.invoke(method, ...params)
}

export const invokeAndTransfer = async (method: string, ...params: readonly any[]): Promise<any> => {
  // @ts-ignore
  return RendererWorker.invokeAndTransfer(method, ...params)
}

export { RendererWorker } from '@lvce-editor/rpc-registry'
