import * as Create2 from '../Create2/Create2.ts'
import * as GetIframeSrc from '../GetIframeSrc/GetIframeSrc.ts'
import * as GetWebViewBaseUrl from '../GetWebViewBaseUrl/GetWebViewBaseUrl.ts'
import * as GetWebViewCsp from '../GetWebViewCsp/GetWebViewCsp.ts'
import * as GetWebViewFrameAncestors from '../GetWebViewFrameAncestors/GetWebViewFrameAncestors.ts'
import * as GetWebViewHtml from '../GetWebViewHtml/GetWebViewHtml.ts'
import * as GetWebViewOrigin from '../GetWebViewOrigin/GetWebViewOrigin.ts'
import * as GetWebViewSandBox from '../GetWebViewSandBox/GetWebViewSandBox.ts'
import * as Location from '../Location/Location.ts'

export const commandMap = {
  // deprecated
  'Location.getHost': Location.getHost,
  'Location.getOrigin': Location.getOrigin,
  'Location.getProtocol': Location.getProtocol,
  'WebView.getBaseUrl': GetWebViewBaseUrl.getWebViewBaseUrl,
  'WebView.getFrameAncestors': GetWebViewFrameAncestors.getWebViewFrameAncestors,
  'WebView.getHtml': GetWebViewHtml.getWebViewHtml,
  'WebView.getIframeSrc': GetIframeSrc.getIframeSrc,
  'WebView.getOrigin': GetWebViewOrigin.getWebViewOrigin,
  'WebView.getSandbox': GetWebViewSandBox.getIframeSandbox,
  'WebView.getWebViewCsp': GetWebViewCsp.getWebViewCsp,

  // new
  'WebView.create2': Create2.create2,
}
