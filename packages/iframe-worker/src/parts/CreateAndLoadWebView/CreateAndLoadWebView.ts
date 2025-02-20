import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const createAndLoadWebView = async (
  id: number,
  iframeSrc: string,
  sandbox: readonly string[],
  iframeCsp: string,
  credentialless: boolean,
  permissionPolicyString: string,
  frameTitle: string,
): Promise<any> => {
  await RendererProcess.invoke('WebView.create', id, iframeSrc, sandbox, iframeCsp, credentialless, permissionPolicyString, frameTitle)

  // TODO maybe iframe waitForLoad is not needed. since it cannot be used detect errors anyway
  // and causes flash of unstyled content, maybe a better way would be to just send the
  // port and wait for the first port message
  await RendererProcess.invoke('WebView.load', id)
}
