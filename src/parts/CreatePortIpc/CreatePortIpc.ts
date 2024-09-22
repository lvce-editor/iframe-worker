import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as JsonRpc from '../JsonRpc/JsonRpc.ts'
import * as SendPortToWebView from '../SendPortToWebView/SendPortToWebView.ts'

const preparePrettyError = (error: any) => {
  return error
}

const logError = () => {
  // ignore
}

const execute = () => {}

const requiresSocket = () => {
  return false
}

export const createPortIpc = async (webViewId: string) => {
  // TODO get webview uid
  // TODO then send port to webview uid
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const firstEventPromise = new Promise((resolve) => {
    port1.onmessage = resolve
  })
  console.log({ webViewId })
  await SendPortToWebView.sendPortToWebView(webViewId, port2)
  const firstEvent = await firstEventPromise
  // @ts-ignore
  if (firstEvent.data !== 'ready') {
    throw new Error('unexpected first message')
  }
  const handleOtherMessage = async (event: any) => {
    // @ts-ignore
    await JsonRpc.handleJsonRpcMessage(ipc, event.data, JsonRpc.resolve, preparePrettyError, execute, logError, requiresSocket)
  }
  port1.onmessage = handleOtherMessage
  const ipc = {
    send(message: any) {
      port1.postMessage(message)
    },
  }
  return ipc
}
