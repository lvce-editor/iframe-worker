import * as Create2 from '../Create2/Create2.ts'
import * as Create3 from '../Create3/Create3.ts'
import { create4 } from '../Create4/Create4.ts'
import * as ExecuteCommand from '../ExecuteCommand/ExecuteCommand.ts'
import * as GetSecret from '../GetSecret/GetSecret.ts'
import * as GetWebViewInfo from '../GetWebViewInfo/GetWebViewInfo.ts'
import { handleMessagePort2 } from '../HandleMessagePort/HandleMessagePort.ts'
import { wrapCommand } from '../IframeStates/IframeStates.ts'
import { initialize } from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as WebViewInterceptor from '../WebViewInterceptor/WebViewInterceptor.ts'

export const commandMap = {
  'Iframes.handleMessagePort': handleMessagePort2,
  'Iframes.initialize': initialize,
  'WebView.create2': Create2.create2,
  'WebView.create3': Create3.create3,
  'WebView.create4': create4,
  'WebView.executeExternalCommand': ExecuteCommand.executeCommand,
  'WebView.getSecret': GetSecret.getSecret,
  'WebView.getWebViewInfo': GetWebViewInfo.getWebViewInfo,
  'WebView.loadContent': wrapCommand(loadContent),
  'WebView.registerInterceptor': WebViewInterceptor.registerInterceptor,
  'WebView.saveState': SaveState.saveState,
  'WebView.unregisterInterceptor': WebViewInterceptor.unregisterInterceptor,
}
