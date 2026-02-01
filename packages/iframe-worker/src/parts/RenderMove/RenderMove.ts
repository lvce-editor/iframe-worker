import { ViewletCommand } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { IframeState } from '../IframeState/IframeState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderMove = (oldState: IframeState, newState: IframeState): any => {
  const { id, iframeSrc, iframeTitle } = newState
  // TODO add command to move iframe to correct parent node
  const dom = [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      onLoad: DomEventListenerFunctions.HandleIframeLoad,
      src: iframeSrc,
      title: iframeTitle,
      // @ts-ignore
      type: VirtualDomElements.Iframe,
    },
  ]
  return [ViewletCommand.SetDom2, id, dom]
}
