import { expect, test } from '@jest/globals'
import * as GetPortTuple from '../src/parts/GetPortTuple/GetPortTuple.ts'

test('getPortTuple', () => {
  const portTuple = GetPortTuple.getPortTuple()
  expect(portTuple.port1).toBeInstanceOf(MessagePort)
  expect(portTuple.port2).toBeInstanceOf(MessagePort)
  expect(portTuple.port1).not.toBe(portTuple.port2)
})
