import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../http-error.class'

export const isAuthenticate = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    throw new UnauthorizedError('로그인 필요')
  }
}

export const isUnAuthenticate = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.isUnauthenticated()) {
    next()
  } else {
    throw new UnauthorizedError('로그인 한 유저는 접근 불가')
  }
}
