import { beforeEach, expect, test } from '@jest/globals'
import { RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import * as GetTextDocument from '../src/parts/GetTextDocument/GetTextDocument.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

beforeEach(() => {
  RpcRegistry.remove(RpcId.RendererWorker)
})

test('returns the matching active editor document', async () => {
  RendererWorker.registerMockRpc({
    'GetActiveEditor.getTextDocumentWithScroll': async () => ({ text: 'content', uri: 'file:///test.md', scrollTop: 20 }),
  })
  await expect(GetTextDocument.getTextDocument('file:///test.md')).resolves.toEqual({ text: 'content', uri: 'file:///test.md', scrollTop: 20 })
})

test('returns undefined for another document', async () => {
  RendererWorker.registerMockRpc({
    'GetActiveEditor.getTextDocumentWithScroll': async () => ({ text: 'content', uri: 'file:///other.md' }),
  })
  await expect(GetTextDocument.getTextDocument('file:///test.md')).resolves.toBeUndefined()
})
