import { ViewletCommand } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { IframeState } from '../IframeState/IframeState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderItems = (oldState: IframeState, newState: IframeState): any => {
  const { id } = newState
  const dom = [
    {
      childCount: 0,
<<<<<<< HEAD
      className: 'iframe-wrapper',
      type: VirtualDomElements.Div,
=======
      onLoad: DomEventListenerFunctions.HandleIframeLoad,
      src: 'https://example.com',
      // @ts-ignore
      type: VirtualDomElements.Iframe,
>>>>>>> origin/main
    },
  ]
  return [ViewletCommand.SetDom2, id, dom]
}
