import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getSecret = async (key: string): Promise<string> => {
  return RendererWorker.invoke('WebView.getSecret', key)
}
