import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as IframeStates from '../IframeStates/IframeStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] => {
  const { newState, oldState } = IframeStates.get(uid)
  IframeStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
