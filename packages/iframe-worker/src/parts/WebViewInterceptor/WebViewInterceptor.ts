import * as WebViewInterceptorState from '../WebViewInterceptorState/WebViewInterceptorState.ts'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const registerInterceptor = async (id: number, port: MessagePort): Promise<void> => {
  WebViewInterceptorState.add(id, port)
}

export const unregisterInterceptor = async (id: number): Promise<void> => {
  WebViewInterceptorState.remove(id)
}
