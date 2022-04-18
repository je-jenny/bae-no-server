import { Response, NextFunction, Request } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { QueryFailedError } from 'typeorm/error/QueryFailedError'
import { HttpError } from '../http-error.class'
import { logger } from '../logger'

export function logHttpErrorMiddleware(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    logger.error(JSON.stringify(err))
    res.status(err.status)
    res.json({
      success: false,
      error: {
        status: err.status,
        message: err.message,
      },
      response: null,
    })
  } else {
    next(err)
  }
}

export function logDBErrorMiddleware(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof QueryFailedError) {
    logger.error(JSON.stringify(err))
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({
      success: false,
      error: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message,
      },
      response: null,
    })
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
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    },
    response: null,
  })
}
