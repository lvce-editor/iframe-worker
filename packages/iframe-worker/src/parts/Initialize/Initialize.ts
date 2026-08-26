import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const initialize = async (platform: number): Promise<void> => {
  PlatformState.setPlatform(platform)
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToExtensionManagementWorker(port, 0)
    },
  })
  ExtensionManagementWorker.set(rpc)
}
