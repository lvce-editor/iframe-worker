import { ViewletCommand } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { IframeState } from '../IframeState/IframeState.ts'

export const renderItems = (oldState: IframeState, newState: IframeState): any => {
  const { id, iframeSrc } = newState
  const dom = [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      src: iframeSrc,
      // @ts-ignore
      type: VirtualDomElements.Iframe,
    },
  ]
  return [ViewletCommand.SetDom2, id, dom]
}
