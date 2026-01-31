import { ViewletCommand } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { IframeState } from '../IframeState/IframeState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderItems = (oldState: IframeState, newState: IframeState): any => {
  const { id, iframeSrc } = newState
  const dom = [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
<<<<<<< HEAD
      onLoad: DomEventListenerFunctions.HandleIframeLoad,
      src: 'https://example.com',
=======
      src: iframeSrc,
>>>>>>> feature/load2
      // @ts-ignore
      type: VirtualDomElements.Iframe,
    },
  ]
  return [ViewletCommand.SetDom2, id, dom]
}
