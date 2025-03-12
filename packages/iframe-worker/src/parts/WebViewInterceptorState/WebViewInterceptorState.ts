const interceptors = Object.create(null)

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const add = (id: number, port: MessagePort): void => {
  interceptors[id] = port
}

export const remove = (id: number): void => {
  delete interceptors[id]
}

export const getAll = (): readonly any[] => {
  return Object.values(interceptors)
}

export const isEmpty = () => {
  return Object.keys(interceptors).length === 0
}
