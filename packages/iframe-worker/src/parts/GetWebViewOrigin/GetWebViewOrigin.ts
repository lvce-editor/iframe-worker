import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getWebViewOrigin = (webViewPort: any, platform: number, webViewScheme: string): string => {
  // TODO don't hardcode protocol
  let origin = ''
  if (platform === PlatformType.Electron) {
    origin = `${webViewScheme}://-/`
  } else if (platform === PlatformType.Remote) {
    origin = `http://localhost:${webViewPort}`
  } else {
    origin = '*' // TODO
  }
  return origin
}
