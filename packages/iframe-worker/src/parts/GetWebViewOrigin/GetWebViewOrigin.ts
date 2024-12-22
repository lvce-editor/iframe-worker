import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as Scheme from '../Scheme/Scheme.ts'

export const getWebViewOrigin = (webViewPort: any, platform: number): string => {
  // TODO don't hardcode protocol
  let origin = ''
  if (platform === PlatformType.Electron) {
    origin = `${Scheme.WebView}://-/`
  } else if (platform === PlatformType.Remote) {
    origin = `http://localhost:${webViewPort}`
  } else {
    origin = '*' // TODO
  }
  return origin
}
