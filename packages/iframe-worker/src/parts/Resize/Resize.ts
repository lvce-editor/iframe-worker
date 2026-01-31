export const resize = (state: any, dimensions: any): any => {
  return {
    ...state,
    ...dimensions,
  }
}
