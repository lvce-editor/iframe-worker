import { ExtensionHost } from '@lvce-editor/rpc-registry'
import type { IframeState } from '../IframeState/IframeState.ts'

export const loadContent = async (state: IframeState, savedState: any): Promise<IframeState> => {
<<<<<<< HEAD
  // @ts-ignore
  const { assetDir, id, platform, uri, webViewScheme } = state
  await ExtensionHost.invoke('WebView.create3', {
    assetDir,
    id,
    platform,
    uri,
    useNewWebViewHandler: true,
    webViewScheme,
  })

=======
>>>>>>> feature/iframe8
  // TODO get iframe src
  // TODO load webview props and register protocol
  return {
    ...state,
  }
}
