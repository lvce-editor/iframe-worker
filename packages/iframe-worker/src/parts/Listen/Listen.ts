import { initializeExtensionHost } from '../InitializeExtensionHost/InitializeExtensionHost.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'

export const listen = async (): Promise<void> => {
  await Promise.all([initializeRendererWorker(), initializeExtensionHost()])
}
