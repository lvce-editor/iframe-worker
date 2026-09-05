import * as IframeStates from '../IframeStates/IframeStates.ts'

export const getTitle = (uid: number): string => {
  const { newState } = IframeStates.get(uid)
  return newState.iframeTitle
}
