import * as Create2 from '../Create2/Create2.ts'
import * as Create3 from '../Create3/Create3.ts'
import * as SaveState from '../SaveState/SaveState.ts'

export const commandMap = {
  'WebView.create2': Create2.create2,
  'WebView.create3': Create3.create3,
  'WebView.saveState': SaveState.saveState,
}
