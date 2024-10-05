import * as GetWebViewFrameAncestors from '../GetWebViewFrameAncestors/GetWebViewFrameAncestors.ts'
import * as Location from '../Location/Location.ts'

export const commandMap = {
  'Location.getProtocol': Location.getProtocol,
  'Location.getHost': Location.getHost,
  'Location.getOrigin': Location.getOrigin,
  'WebView.getFrameAncestors': GetWebViewFrameAncestors.getWebViewFrameAncestors,
}
