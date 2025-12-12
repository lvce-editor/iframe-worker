import * as WebViewInterceptorState from '../WebViewInterceptorState/WebViewInterceptorState.ts'

export const registerInterceptor = async (id: number, port: MessagePort): Promise<void> => {
  WebViewInterceptorState.add(id, port)
}

export const unregisterInterceptor = async (id: number): Promise<void> => {
  WebViewInterceptorState.remove(id)
}
