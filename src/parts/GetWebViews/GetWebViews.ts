import * as GetWebViewsNode from '../GetWebViewsNode/GetWebViewsNode.ts'
import * as GetWebViewsWeb from '../GetWebViewsWeb/GetWebViewsWeb.ts'
import * as Platform from '../Platform/Platform.js'
import * as PlatformType from '../PlatformType/PlatformType.js'

const getWebViewsDefault = async () => {
  switch (Platform.platform) {
    case PlatformType.Web:
      return GetWebViewsWeb.getWebViewsWeb()
    case PlatformType.Test:
      return []
    default:
      return GetWebViewsNode.getWebViewsNode()
  }
}

export const getWebViews = async () => {
  const nodeWebViews = await getWebViewsDefault()
  // TODO ask renderer worker for webviews
  // const registeredWebViews = WebViews.get()
  const allWebViews = [...nodeWebViews]
  return allWebViews
}
