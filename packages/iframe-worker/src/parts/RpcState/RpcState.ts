import type { WebView } from '../WebView/WebView.ts'

const rpcs: Record<number, WebView> = Object.create(null)

export const set = (id: number, rpc: WebView): void => {
  rpcs[id] = rpc
}

export const has = (id: number | string): boolean => {
  return id in rpcs
}

export const get = (id: number): WebView => {
  return rpcs[id]
}

export const getAll = (): Record<number, WebView> => {
  return rpcs
}
