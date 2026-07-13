export const getCredentialLess = (locationHost: string): boolean => {
  // disabled for localhost to improve performance and make testing easier
  return !locationHost.startsWith('localhost:')
}
