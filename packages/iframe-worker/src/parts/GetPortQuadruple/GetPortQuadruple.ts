import type { PortQuadruple } from '../PortQuadruple/PortQuadruple.ts'

export const getPortQuadruple = (): PortQuadruple => {
  const { port1, port2 } = new MessageChannel()
  const { port1: port3, port2: port4 } = new MessageChannel()
  return { port1, port2, port3, port4 }
}
