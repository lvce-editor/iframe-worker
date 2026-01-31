import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionHost, RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionHostWorker(port, 0)
}

export const initializExtensionHost = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: CommandMap.commandMap,
    send,
  })
  ExtensionHost.set(rpc)
}
