import * as PlatformType from '../PlatformType/PlatformType.js'
import * as Sandbox from '../Sandbox/Sandbox.ts'

export const getIframeSandbox = (webView: any, platform: any): readonly string[] => {
  const extensionSandbox = webView.sandbox || []
  if (platform === PlatformType.Remote) {
    return [Sandbox.AllowScripts, Sandbox.AllowSameOrigin, ...extensionSandbox] // TODO maybe disallow same origin
  }
  if (platform === PlatformType.Web) {
    return [Sandbox.AllowScripts, ...extensionSandbox]
  }
  // TODO set something for electron
  return [...extensionSandbox]
}
