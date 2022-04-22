jest.mock('./src/middlewares/authenticate-handler.ts', () => {
  return {
    __esmodule: true,
    isAuthenticate: jest.fn(async (req, res, next) => {
      req.user = { id: 1 }
      next()
    }),
  }
})
