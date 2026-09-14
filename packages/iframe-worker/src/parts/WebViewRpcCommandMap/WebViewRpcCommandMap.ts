import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as GetRemoteUrl from '../GetRemoteUrl/GetRemoteUrl.ts'
import * as GetTextDocument from '../GetTextDocument/GetTextDocument.ts'

export const commandMap = {
  'WebView.getRemoteUrl': GetRemoteUrl.getRemoteUrl,
  'WebView.getTextDocument': GetTextDocument.getTextDocument,
  'WebView.readFile': FileSystem.readFile,
}
