import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import { IframeState } from '../IframeState/IframeState.ts'

export const { get, getCommandIds, registerCommands, set, wrapGetter } = ViewletRegistry.create<IframeState>()
