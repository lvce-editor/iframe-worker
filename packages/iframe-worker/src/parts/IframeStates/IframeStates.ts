import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { IframeState } from '../IframeState/IframeState.ts'

export const { diff, get, getCommandIds, set, wrapCommand } = ViewletRegistry.create<IframeState>()
