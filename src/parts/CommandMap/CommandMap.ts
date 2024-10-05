import * as GetIframeSrc from '../GetIframeSrc/GetIframeSrc.ts'
import * as GetWebViewCsp from '../GetWebViewCsp/GetWebViewCsp.ts'
import * as GetWebViewFrameAncestors from '../GetWebViewFrameAncestors/GetWebViewFrameAncestors.ts'
import * as GetWebViewOrigin from '../GetWebViewOrigin/GetWebViewOrigin.ts'
import * as GetWebViewSandBox from '../GetWebViewSandBox/GetWebViewSandBox.ts'
import * as Location from '../Location/Location.ts'

export const commandMap = {
  'Location.getHost': Location.getHost,
  'Location.getOrigin': Location.getOrigin,
  'Location.getProtocol': Location.getProtocol,
  'WebView.getFrameAncestors': GetWebViewFrameAncestors.getWebViewFrameAncestors,
  'WebView.getIframeSrc': GetIframeSrc.getIframeSrc,
  'WebView.getOrigin': GetWebViewOrigin.getWebViewOrigin,
  'WebView.getSandbox': GetWebViewSandBox.getIframeSandbox,
  'WebView.getWebViewCsp': GetWebViewCsp.getWebViewCsp,
}
