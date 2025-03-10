import * as Create2 from '../Create2/Create2.ts'
import * as Create3 from '../Create3/Create3.ts'
import * as GetSecret from '../GetSecret/GetSecret.ts'
import * as GetWebViewInfo from '../GetWebViewInfo/GetWebViewInfo.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as WebViewInterceptor from '../WebViewInterceptor/WebViewInterceptor.ts'

export const commandMap = {
  'WebView.create2': Create2.create2,
  'WebView.create3': Create3.create3,
  'WebView.saveState': SaveState.saveState,
  'WebView.getSecret': GetSecret.getSecret,
  'WebView.getWebViewInfo': GetWebViewInfo.getWebViewInfo,
  'WebView.registerInterceptor': WebViewInterceptor.registerInterceptor,
  'WebView.unregisterInterceptor': WebViewInterceptor.unregisterInterceptor,
}
