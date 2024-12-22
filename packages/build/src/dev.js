import { execa } from 'execa'
import { root } from './root.js'

const main = async () => {
  execa(`npm`, ['run', 'build:watch'], {
    cwd: root,
    stdio: 'inherit',
  })
  execa('node', ['packages/server/node_modules/@lvce-editor/server/bin/server.js'], {
    cwd: root,
    stdio: 'inherit',
  })
}

main()