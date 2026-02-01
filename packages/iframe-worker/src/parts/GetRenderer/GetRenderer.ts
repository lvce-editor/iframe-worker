import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'
import { renderMove } from '../RenderMove/RenderMove.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderItems:
      return renderItems
    case DiffType.RenderMove:
      return renderMove
    default:
      throw new Error('unknown renderer')
  }
}
