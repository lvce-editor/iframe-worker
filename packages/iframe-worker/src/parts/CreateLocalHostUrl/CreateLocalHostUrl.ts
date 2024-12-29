import * as CreateUrl from '../CreateUrl/CreateUrl.ts'

export const createLocalHostUrl = (
  locationProtocol: string,
  locationHost: string,
  isGitpod: boolean,
  webViewPort: string,
  webViewId: string,
  useNewWebViewHandler?: boolean,
): string => {
  if (isGitpod) {
    return CreateUrl.createUrl(locationProtocol, locationHost.replace('3000', `${webViewPort}`))
  }
  if (useNewWebViewHandler) {
    return `http://localhost:${webViewPort}/${webViewId}`
  }
  return `http://localhost:${webViewPort}`
}
