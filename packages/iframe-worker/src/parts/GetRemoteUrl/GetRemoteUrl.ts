import type { GetRemoteUrlOptions } from '../GetRemoteUrlOptions/GetRemoteUrlOptions.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetRemoteUrlForWebView from '../GetRemoteUrlForWebView/GetRemoteUrlForWebView.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

const getFilePath = (uri: string): string => {
  if (uri.startsWith('file:')) {
    return new URL(uri).pathname
  }
  return uri.startsWith('/') ? uri : `/${uri}`
}

const getRemoteFileUrl = async (uri: string): Promise<string> => {
  if (!(await FileSystem.exists(uri))) {
    throw new Error(`File not found: ${decodeURIComponent(getFilePath(uri))}`)
  }
  return `/remote${encodeURI(decodeURI(getFilePath(uri)))}`
}

export const getRemoteUrl = async (options: GetRemoteUrlOptions): Promise<string> => {
  const { uri } = options
  const platform = PlatformState.getPlatform() || PlatformType.Web
  // TODO uri should always have protocol
  // then ask file system provider for remote url, for example disk file system provider or html file system provider
  const protocol = GetProtocol.getProtocol(uri)
  if (platform === PlatformType.Remote && !protocol) {
    return getRemoteFileUrl(uri)
  }
  if (protocol === 'file') {
    return getRemoteFileUrl(uri)
  }
  if (platform === PlatformType.Electron && !protocol) {
    return getRemoteFileUrl(uri)
  }
  return GetRemoteUrlForWebView.getRemoteUrlForWebView(options)
}
