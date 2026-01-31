import type { IframeState } from '../IframeState/IframeState.ts'

export const loadContent = async (state: IframeState, savedState: any): Promise<IframeState> => {
  // TODO get iframe src
  // TODO load webview props and register protocol
  return {
    ...state,
  }
}
