import * as DiffModules from '../DiffModules/DiffModules.ts'
import * as IframeStates from '../IframeStates/IframeStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  return IframeStates.diff(uid, DiffModules.modules, DiffModules.numbers)
}
