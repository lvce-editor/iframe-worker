import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

const getRemoteUrl = (options: any): Promise<string> => {
  return ExtensionHostWorker.invoke('WebView.getRemoteUrl', options)
}

export const commandMap = {
  'WebView.getRemoteUrl': getRemoteUrl,
}
