export const isWindowsPath = (path: string): boolean => {
  return path.startsWith('A:\\') || path.startsWith('B:\\') || path.startsWith('C:\\') || path.startsWith('D:\\') || path.startsWith('E:\\')
}
