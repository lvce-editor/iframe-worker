import * as Assert from '@lvce-editor/assert'
import { PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const handleMessagePort2 = async (port: MessagePort, rpcId?: number): Promise<void> => {
  Assert.object(port)
  const rpc = await PlainMessagePortRpcParent.create({
    commandMap: {},
    messagePort: port,
  })
  if (rpcId) {
    RpcRegistry.set(rpcId, rpc)
  }
}
