import * as GetWebViewCsp from '../GetWebViewCsp/GetWebViewCsp.ts'
import * as GetWebViewFrameAncestors from '../GetWebViewFrameAncestors/GetWebViewFrameAncestors.ts'
import * as GetWebViewSandBox from '../GetWebViewSandBox/GetWebViewSandBox.ts'
import * as Location from '../Location/Location.ts'

export const commandMap = {
  'Location.getHost': Location.getHost,
  'Location.getOrigin': Location.getOrigin,
  'Location.getProtocol': Location.getProtocol,
  'WebView.getFrameAncestors': GetWebViewFrameAncestors.getWebViewFrameAncestors,
  'WebView.getSandbox': GetWebViewSandBox.getIframeSandbox,
  'WebView.getWebViewCsp': GetWebViewCsp.getWebViewCsp,
}
