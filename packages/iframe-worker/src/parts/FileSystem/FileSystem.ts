import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const readFile = (uri: string): Promise<string> => {
  return RendererWorker.invoke('FileSystem.readFile', uri)
}
