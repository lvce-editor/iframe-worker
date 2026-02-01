import type { IframeState } from '../IframeState/IframeState.ts'

export const renderMove = (oldState: IframeState, newState: IframeState): any => {
  const { id } = newState
  return ['Viewlet.move', id, 'iframe', '.iframe-wrapper']
}
