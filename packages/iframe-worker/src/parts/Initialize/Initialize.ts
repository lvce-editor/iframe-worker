import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionHost, RendererWorker } from '@lvce-editor/rpc-registry'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const initialize = async (platform: number): Promise<void> => {
  PlatformState.setPlatform(platform)
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToExtensionHostWorker(port, 0)
    },
  })
  ExtensionHost.set(rpc)
}
