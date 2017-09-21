export const errorMessage = str => {
  return str ? str.replace(/^\[.*\]/, '') : ''
}
