import * as IpcState from '../IpcState/IpcState.ts'

export const listen = (ipc: any) => {
  IpcState.set(ipc)
}
