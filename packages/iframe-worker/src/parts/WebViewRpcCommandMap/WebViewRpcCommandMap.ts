import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as GetRemoteUrl from '../GetRemoteUrl/GetRemoteUrl.ts'

export const commandMap = {
  'WebView.getRemoteUrl': GetRemoteUrl.getRemoteUrl,
  'WebView.readFile': FileSystem.readFile,
}
