import { ViewletCommand } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { IframeState } from '../IframeState/IframeState.ts'

export const renderItems = (oldState: IframeState, newState: IframeState): any => {
  const { id } = newState
  const dom = [
    {
      childCount: 0,
      className: 'iframe-wrapper',
      type: VirtualDomElements.Div,
    },
    // {
    //   childCount: 0,
    //   onLoad: DomEventListenerFunctions.HandleIframeLoad,
    //   src: iframeSrc,
    //   title: iframeTitle,
    //   // @ts-ignore
    //   type: VirtualDomElements.Iframe,
    // },
  ]
  return [ViewletCommand.SetDom2, id, dom]
}
