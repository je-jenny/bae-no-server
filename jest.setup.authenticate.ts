jest.mock('./src/middlewares/jwt-auth.ts', () => {
  return {
    __esmodule: true,
    // isAuthenticate: jest.fn(async (req, res, next) => {
    //   req.user = { id: 1 }
    //   next()
    // }),

    // isUnAuthenticate: jest.fn(async (req, res, next) => {
    //   next()
    // }),

    authJWT: jest.fn(async (req, res, next) => {
      req.id = 1
      next()
    }),
  }
})
