import type { GetRemoteUrlOptions } from '../GetRemoteUrlOptions/GetRemoteUrlOptions.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetRemoteUrlForWebView from '../GetRemoteUrlForWebView/GetRemoteUrlForWebView.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getRemoteUrl = async (options: GetRemoteUrlOptions): Promise<string> => {
  const { uri } = options
  const platform = PlatformState.getPlatform() || PlatformType.Web
  // TODO uri should always have protocol
  // then ask file system provider for remote url, for example disk file system provider or html file system provider
  const protocol = GetProtocol.getProtocol(uri)
  if (platform === PlatformType.Remote && !protocol) {
    if (uri.startsWith('/')) {
      return `/remote${uri}`
    }
    return `/remote/${uri}`
  }
  if (platform === PlatformType.Electron && !protocol) {
    if (uri.startsWith('/')) {
      return `/remote${uri}`
    }
    return `/remote/${uri}`
  }
  return GetRemoteUrlForWebView.getRemoteUrlForWebView(options)
}
