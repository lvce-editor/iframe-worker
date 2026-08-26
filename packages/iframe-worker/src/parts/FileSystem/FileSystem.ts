import { RendererWorker } from '@lvce-editor/rpc-registry'

export const exists = (uri: string): Promise<boolean> => {
  return RendererWorker.invoke('FileSystem.exists', uri)
}

export const readFile = (uri: string): Promise<string> => {
  return RendererWorker.invoke('FileSystem.readFile', uri)
}
