import * as ParentRpc from '../Rpc/Rpc.ts'

export const executeCommand = (method: string, ...params: readonly any[]): Promise<any> => {
  // @ts-ignore
  return ParentRpc.invoke('ExecuteExternalCommand.executeExternalCommand', method, ...params)
}
