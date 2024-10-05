import * as CreateUrl from '../CreateUrl/CreateUrl.ts'

export const getWebViewFrameAncestors = (locationProtocol: string, locationHost: string) => {
  const frameAncestors = CreateUrl.createUrl(locationProtocol, locationHost)
  return frameAncestors
}
