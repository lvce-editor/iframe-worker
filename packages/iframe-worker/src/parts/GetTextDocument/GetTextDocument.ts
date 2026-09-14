import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getTextDocument = async (uri: string): Promise<any> => {
  const textDocument = await RendererWorker.invoke('GetActiveEditor.getTextDocumentWithScroll')
  if (!textDocument || textDocument.uri !== uri) {
    return undefined
  }
  return textDocument
}
