import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const setPort = async (uid: number, port: MessagePort, origin: string, portType: string): Promise<void> => {
  await RendererProcess.invokeAndTransfer('WebView.setPort', uid, port, origin, portType)
}
