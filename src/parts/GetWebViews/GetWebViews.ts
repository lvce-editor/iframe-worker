import * as GetWebViewsNode from '../GetWebViewsNode/GetWebViewsNode.ts'
import * as GetWebViewsWeb from '../GetWebViewsWeb/GetWebViewsWeb.ts'
import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

const getWebViewsDefault = async (): Promise<readonly any[]> => {
  switch (Platform.platform) {
    case PlatformType.Web:
      return GetWebViewsWeb.getWebViewsWeb()
    case PlatformType.Test:
      return []
    default:
      return GetWebViewsNode.getWebViewsNode()
  }
}

export const getWebViews = async (): Promise<readonly any[]> => {
  const nodeWebViews = await getWebViewsDefault()
  // TODO ask renderer worker for webviews
  // const registeredWebViews = WebViews.get()
  const allWebViews = [...nodeWebViews]
  return allWebViews
}
