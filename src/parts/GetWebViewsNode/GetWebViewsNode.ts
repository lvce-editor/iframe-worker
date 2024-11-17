import * as SharedProcess from '../SharedProcess/SharedProcess.ts'

export const getWebViewsNode = async () => {
  const webViews = await SharedProcess.invoke('ExtensionHost.getWebViews')
  return webViews
}
