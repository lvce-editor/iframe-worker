import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getSecret = async (key: string): Promise<string> => {
  return RendererWorker.invoke('WebView.getSecret', key)
}
