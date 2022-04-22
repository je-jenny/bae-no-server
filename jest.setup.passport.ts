jest.mock('./src/passports/google-strategy.ts', () => {
  return jest.fn()
})

jest.mock('./src/passports/kakao-strategy.ts', () => {
  return jest.fn()
})
