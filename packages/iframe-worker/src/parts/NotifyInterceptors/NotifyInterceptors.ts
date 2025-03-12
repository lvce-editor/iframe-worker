import * as WebViewInterceptorState from '../WebViewInterceptorState/WebViewInterceptorState.ts'

export const notifyInterceptors = (message: any): void => {
  if (WebViewInterceptorState.isEmpty()) {
    return
  }
  const ports = WebViewInterceptorState.getAll()
  // TODO use rpc.invoke
  for (const port of ports) {
    port.postMessage({
      jsonrpc: '2.0',
      method: 'handleMessageCalled',
      params: [message],
    })
  }
}
