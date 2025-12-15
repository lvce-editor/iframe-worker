import { RendererWorker } from '@lvce-editor/rpc-registry'

export const createSecondaryWebViewConnection = async (uid: number, origin: string, port: MessagePort): Promise<void> => {
  const portType = 'application'
  await RendererWorker.invokeAndTransfer('WebView.setPort', uid, port, origin, portType)
}
