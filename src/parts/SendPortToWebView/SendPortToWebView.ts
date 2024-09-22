import * as Rpc from '../Rpc/Rpc.ts'

export const sendPortToWebView = async (webviewId: string, port: MessagePort) => {
  await Rpc.invokeAndTransfer('Transferrable.transferToRendererProcess', webviewId, port)
  console.log('did send port to renderer process')
  // TODO ask renderer process to transfer the port to the webview
}
