import { expect, test } from '@jest/globals'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import { create4 } from '../src/parts/Create4/Create4.ts'
import * as IframeStates from '../src/parts/IframeStates/IframeStates.ts'

test('commandMap', () => {
  expect(typeof CommandMap.commandMap).toBe('object')
})

test('gets the current title of each webview instance through the command map', () => {
  for (const [index, title] of ['CSV Viewer', 'Heap Snapshot Viewer', 'Video Preview'].entries()) {
    const id = index + 100
    create4(id, 'file:///test', 0, 0, 100, 100, 1, '/static', 'webview')
    const { newState } = IframeStates.get(id)
    IframeStates.set(id, newState, { ...newState, iframeTitle: title })
    expect(CommandMap.commandMap['WebView.getTitle'](id)).toBe(title)
  }
})
