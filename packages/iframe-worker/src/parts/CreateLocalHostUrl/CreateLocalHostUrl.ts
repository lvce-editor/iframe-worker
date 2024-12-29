import * as CreateUrl from '../CreateUrl/CreateUrl.ts'

export const createLocalHostUrl = (locationProtocol: string, locationHost: string, isGitpod: boolean, webViewPort: string): string => {
  if (isGitpod) {
    return CreateUrl.createUrl(locationProtocol, locationHost.replace('3000', `${webViewPort}`))
  }
  return `http://localhost:${webViewPort}`
}
