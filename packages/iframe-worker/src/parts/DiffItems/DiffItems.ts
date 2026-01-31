import type { IframeState } from '../IframeState/IframeState.ts'

export const isEqual = (oldState: IframeState, newState: IframeState): boolean => {
  return oldState === newState
}
