import * as WebViewInterceptorState from '../WebViewInterceptorState/WebViewInterceptorState.ts'

export const notifyInterceptors = (message: any): void => {
  const ports = WebViewInterceptorState.getAll()
  if (ports.length === 0) {
    return
  }
  // TODO use rpc.invoke
  for (const port of ports) {
    port.postMessage({
      jsonrpc: '2.0',
      method: 'handleMessageCalled',
      params: [message],
    })
  }
}
