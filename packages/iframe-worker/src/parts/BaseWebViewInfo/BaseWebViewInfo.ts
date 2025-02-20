export interface BaseWebViewInfo {
  readonly allow: readonly string[]
  readonly contentSecurityPolicy: readonly string[]
  readonly elements: readonly any[]
  readonly id: string
  readonly path: string
  readonly remotePath: string
  readonly rpc: string
  readonly sandbox: readonly string[]
  readonly selector: readonly string[]
  readonly uri: string
}
