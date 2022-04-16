import { Request, Response } from 'express'
import { User } from '.'
import { CreateUserDto } from './dtos'

export interface IUserController {
  createUser(req: Request, res: Response): Promise<void>
}

export interface IUserService {
  createUser(data: CreateUserDto): Promise<User>
}
