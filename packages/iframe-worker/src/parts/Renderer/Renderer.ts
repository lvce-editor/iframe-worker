import type { IframeState } from '../IframeState/IframeState.ts'

export interface Renderer {
  (oldState: IframeState, newState: IframeState): readonly any[]
}
