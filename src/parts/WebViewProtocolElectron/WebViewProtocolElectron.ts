import * as WebViewServer from '../WebViewServer/WebViewServer.ts'

export const register = async (previewServerId: number) => {
  await WebViewServer.registerProtocol()
  await WebViewServer.create(previewServerId) // TODO move this up
}
