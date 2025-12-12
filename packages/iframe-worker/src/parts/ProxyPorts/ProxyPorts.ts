export const proxyPorts = (port1: MessagePort, port2: MessagePort): void => {
  port1.addEventListener('message', (event: any) => {
    port2.postMessage(event.data)
  })

  port2.addEventListener('message', (event: any) => {
    port1.postMessage(event.data)
  })
}
