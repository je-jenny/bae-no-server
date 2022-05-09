import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../http-error.class'
import { verify } from '../utils'

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError('No Authorized!')
  }

  const token = req.headers.authorization.split('Bearer ')[1]
  const result = verify(token)

  if (!result.ok) {
    throw new UnauthorizedError(result.message)
  }

  req.id = result.id
  next()
}
