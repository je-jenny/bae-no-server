export function generateRandomCode(n: number) {
  let str = ''
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}
