const state = {
  rpc: undefined,
}

export const invoke = (method: string, ...params: any[]): Promise<any> => {
  const rpc = state.rpc
  // @ts-ignore
  return rpc.invoke(method, ...params)
}

export const invokeAndTransfer = (method: string, ...params: any[]): Promise<any> => {
  const rpc = state.rpc
  // @ts-ignore
  return rpc.invokeAndTransfer(method, ...params)
}

export const setRpc = (rpc: any): void => {
  state.rpc = rpc
}
