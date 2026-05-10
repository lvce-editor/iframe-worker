export const getCredentialLess = (locationHost: string): boolean => {
  return !locationHost.startsWith('localhost:')
}
