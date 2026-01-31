export interface IframeState {
  readonly id: string
  readonly uri: string
  readonly iframeSrc: string
  readonly srcDoc: string
  readonly sandbox: string[]
  readonly portId: number
  readonly origin: string
  readonly previewServerId: number
  readonly csp: string
  readonly credentialless: boolean
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}
