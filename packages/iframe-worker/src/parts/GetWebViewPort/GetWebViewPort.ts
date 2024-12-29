import * as PlatformType from '../PlatformType/PlatformType.js'

export const getWebViewPort = (platform: number, locationPort: string): string => {
  if (platform === PlatformType.Web) {
    return locationPort
  }
  // TODO make port configurable
  return '3002'
}
