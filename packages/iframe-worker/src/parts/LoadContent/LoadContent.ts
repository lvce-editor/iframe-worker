import type { IframeState } from '../IframeState/IframeState.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as GetFileDecorations from '../GetFileDecorations/GetFileDecorations.ts'
import { getScheme } from '../GetScheme/GetScheme.ts'
import * as GetSettings from '../GetSettings/GetSettings.ts'
import * as GetWorkspacePath from '../GetWorkspacePath/GetWorkspacePath.ts'
import * as RestoreExpandedState from '../RestoreExpandedState/RestoreExpandedState.ts'

export const loadContent = async (state: IframeState, savedState: any): Promise<IframeState> => {
  const { assetDir, platform } = state
  const { confirmDelete, sourceControlDecorations, useChevrons } = await GetSettings.getSettings()
  const workspacePath = await GetWorkspacePath.getWorkspacePath()
  return {
    ...state,
    confirmDelete,
    decorations,
    deltaY,
    excluded,
    initial: true,
    items: restoredDirents,
    maxIndent: 10,
    minLineY,
    pathSeparator,
    root,
    useChevrons,
  }
}
