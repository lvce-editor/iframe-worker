import type { PortTuple } from '../PortTuple/PortTuple.ts'

export const getPortTuple = (): PortTuple => {
  const { port1, port2 } = new MessageChannel()
  return { port1, port2 }
}
