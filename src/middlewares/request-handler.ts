import { Request, Response, NextFunction } from 'express'
import { logger } from '../logger'

export const requestHandler = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  logger.info(`[${req.method}]: ${req.originalUrl}`)
  next()
}
