export const getCredentialLess = (locationHost: string) => {
  if (locationHost.startsWith('localhost:')) {
    // disabled to improve performance and make testing easier
    return false
  }
  return true
}
