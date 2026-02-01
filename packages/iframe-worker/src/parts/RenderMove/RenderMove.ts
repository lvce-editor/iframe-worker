import type { IframeState } from '../IframeState/IframeState.ts'

export const renderMove = (oldState: IframeState, newState: IframeState): any => {
  const { id } = newState
  const source = `.Workbench > iframe`
  const target = `[data-id="${id}"] .iframe-wrapper`
  return ['Viewlet.move', id, source, target]
}
