import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getWebViewOrigin = (webViewPort: any, platform: number, webViewScheme: string, webViewId: string): string => {
  switch (platform) {
    case PlatformType.Electron:
      return `${webViewScheme}://${webViewId}`
    case PlatformType.Remote:
      // TODO support gitpod / codespaces
      return `http://localhost:${webViewPort}`
    default:
      // TODO
      return '*'
  }
}
