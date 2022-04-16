import { Response, NextFunction, Request } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { HttpError } from '../http-error.class'
import { logger } from '../logger'

export function logExErrorMiddleware(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    logger.error(JSON.stringify(err))
    res.status(err.status)
    res.json({ name: err.name, message: err.message })
  } else {
    next(err)
  }
}

export function logInternalServerErrorMiddleware(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  logger.error(JSON.stringify(err))
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
}
