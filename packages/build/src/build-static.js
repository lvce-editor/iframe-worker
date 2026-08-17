import { join } from 'node:path'
import { root } from './root.js'
import { cp } from 'node:fs/promises'

const sharedProcess = await import('@lvce-editor/shared-process')

process.env.PATH_PREFIX = '/iframe-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
})

await cp(
  join(root, '.tmp', 'dist', 'dist', 'iframeWorkerMain.js'),
  join(root, 'dist', commitHash, 'packages', 'iframe-worker', 'dist', 'iframeWorkerMain.js'),
)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
