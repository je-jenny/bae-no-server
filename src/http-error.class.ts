/* eslint-disable max-classes-per-file */

// type ObjectType = Record<any, string> | undefined
import { StatusCodes } from 'http-status-codes'

export class HttpError extends Error {
  status: number

  constructor(status: number, message?: string) {
    super(message)
    const { name, prototype } = new.target

    Object.setPrototypeOf(this, prototype)
    this.name = name
    this.status = status
  }
}

export class BadReqError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.BAD_REQUEST, message)
    const { name, prototype } = new.target

    Object.setPrototypeOf(this, prototype)
    this.name = name
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message)
    const { name, prototype } = new.target

    Object.setPrototypeOf(this, prototype)
    this.name = name
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.UNAUTHORIZED, message)
    const { name, prototype } = new.target

    Object.setPrototypeOf(this, prototype)
    this.name = name
  }
}
