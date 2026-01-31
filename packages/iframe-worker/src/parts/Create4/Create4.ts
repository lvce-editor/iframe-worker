import * as Assert from '@lvce-editor/assert'
import type { IframeState } from '../IframeState/IframeState.ts'
import * as IframeStates from '../IframeStates/IframeStates.ts'

// TODO parentUid might ot be needed
export const create4 = (
  id: number,
  uri: string,
  x: number,
  y: number,
  width: number,
  height: number,
  platform: number = 0,
  assetDir: string = '',
): void => {
  Assert.number(platform)
  Assert.string(assetDir)
  const state: IframeState = {
    assetDir,
    credentialless: true,
    csp: '',
    height,
    id,
    iframeSrc: '',
    origin: '',
    platform,
    portId: 0,
    previewServerId: 1,
    sandbox: [],
    srcDoc: '',
    uri,
    webViewScheme: '',
    width,
    x: x - 1,
    y,
  }
  IframeStates.set(state.id, state, state)
}
